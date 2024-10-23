<script>
	import { ShoppingCartIcon } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserId, fetchCartItems, updateCartItem } from '$lib/api';

	onMount(async () => {
		const userId = await getUserId();
		if (userId) {
			const cartData = await fetchCartItems(userId);
			if (cartData) {
				$cartItems = cartData.books.map((book) => ({
					id: book.id,
					title: book.title,
					price: book.price,
					quantity: book.quantity || 1
				}));
			}
		}
	});

	let showModal = false;
	function toggleModal() {
		showModal = !showModal;
	}

	async function updateQuantity(index, change) {
		const userId = await getUserId();
		if (!userId) return;

		const item = $cartItems[index];
		const newQuantity = Math.max(0, item.quantity + change);

		try {
			const success = await updateCartItem(userId, item.id, change > 0 ? 1 : -1);

			if (success) {
				if (newQuantity === 0) {
					$cartItems = $cartItems.filter((_, i) => i !== index);
				} else {
					item.quantity = newQuantity;
					$cartItems = [...$cartItems];
				}
			}
		} catch (error) {
			console.error('Error updating quantity:', error);
		}
	}

	$: $itemCount = $cartItems.reduce((total, item) => total + item.quantity, 0);
</script>

<button
	on:click={toggleModal}
	class="fixed bottom-24 md:bottom-4 right-4 z-50 bg-primary-800 text-white rounded-2xl p-3 flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors duration-200"
>
	<ShoppingCartIcon size={24} />
	<span
		class="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
	>
		{$itemCount}
	</span>
</button>

{#if showModal}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
	>
		<div
			transition:fade={{ duration: 200 }}
			class="relative bg-white p-4 rounded-lg sm:rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
		>
			<h2 class="text-xl font-bold mb-3">Your Cart</h2>
			{#if $cartItems.length === 0}
				<p class="text-gray-500">Your cart is empty.</p>
			{:else}
				<ul class="divide-y divide-gray-200">
					{#each $cartItems as item, index}
						<li class="py-2 flex justify-between items-center">
							<span class="font-medium">{item.title}</span>
							<div class="flex items-center">
								<button
									on:click={() => updateQuantity(index, -1)}
									class="px-2 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300 transition-colors duration-200"
								>
									-
								</button>
								<span class="px-3 py-1 bg-gray-100">{item.quantity}</span>
								<button
									on:click={() => updateQuantity(index, 1)}
									class="px-2 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors duration-200"
								>
									+
								</button>
								<span class="ml-4 text-primary-800"
									>{(item.price * item.quantity).toFixed(2)} Ft</span
								>
							</div>
						</li>
					{/each}
				</ul>
				<div class="mt-4 pt-2 border-t border-gray-200 font-bold flex justify-between">
					<span>Total:</span>
					<span>
						{$cartItems
							.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
							.toFixed(2)} Ft
					</span>
				</div>
			{/if}
			<div class="mt-4 flex justify-end">
				<button
					on:click={toggleModal}
					class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 transition-colors duration-200"
				>
					Close
				</button>
				<button
					class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
				>
					Checkout
				</button>
			</div>
		</div>
	</div>
{/if}
