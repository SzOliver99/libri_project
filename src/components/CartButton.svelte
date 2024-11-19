<script>
	import { ShoppingCartIcon } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserToken, fetchCartItems, updateCartItem } from '$lib/api';

	let showModal = $state(false);
	function toggleModal() {
		showModal = !showModal;
	}

	async function incrementQuantity(index) {
		await updateQuantity(index, 1);
	}

	async function decrementQuantity(index) {
		await updateQuantity(index, -1);
	}

	async function updateQuantity(index, change) {
		const userToken = getUserToken();
		if (!userToken) return;

		const item = $cartItems[index];
		try {
			const success = await updateCartItem(userToken, item.id, change);

			if (success) {
				const newQuantity = Math.max(0, item.quantity + change);
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

	$effect(async () => {
		const userToken = getUserToken();
		if (userToken) {
			const cartData = await fetchCartItems(userToken);
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

	$effect(() => {
		$itemCount = $cartItems.reduce((total, item) => total + item.quantity, 0);
	});
</script>

<button
	onclick={toggleModal}
	class="fixed bottom-24 right-4 z-50 flex items-center justify-center rounded-2xl bg-primary-800 p-3 text-white shadow-lg transition-colors duration-200 hover:bg-primary-700 md:bottom-4"
>
	<ShoppingCartIcon size={24} />
	<span
		class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold"
	>
		{$itemCount}
	</span>
</button>

{#if showModal}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
	>
		<div
			transition:fade={{ duration: 200 }}
			class="relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-4 sm:rounded-lg"
		>
			<h2 class="mb-3 text-xl font-bold">Your Cart</h2>
			{#if $cartItems.length === 0}
				<p class="text-gray-500">Your cart is empty.</p>
			{:else}
				<ul class="divide-y divide-gray-200">
					{#each $cartItems as item, index}
						<li class="flex items-center justify-between py-2">
							<span class="font-medium">{item.title}</span>
							<div class="flex items-center">
								<button
									onclick={() => decrementQuantity(index)}
									class="rounded-l-lg bg-gray-200 px-2 py-1 transition-colors duration-200 hover:bg-gray-300"
								>
									-
								</button>
								<span class="bg-gray-100 px-3 py-1">{item.quantity}</span>
								<button
									onclick={() => incrementQuantity(index)}
									class="rounded-r-lg bg-gray-200 px-2 py-1 transition-colors duration-200 hover:bg-gray-300"
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
				<div class="mt-4 flex justify-between border-t border-gray-200 pt-2 font-bold">
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
					onclick={toggleModal}
					class="mr-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-200 hover:bg-gray-300"
				>
					Close
				</button>
				<button
					class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-700"
				>
					Checkout
				</button>
			</div>
		</div>
	</div>
{/if}
