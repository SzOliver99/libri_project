<script>
	import { ShoppingCartIcon } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserToken, fetchCartItems, updateCartItem, fetchBuyCart } from '$lib/api';
	import { notify } from '$lib/utils/notify';

	async function incrementQuantity(index) {
		await updateQuantity(index, 1);
	}

	async function decrementQuantity(index) {
		await updateQuantity(index, -1);
	}

	async function updateQuantity(index, change) {
		if (!getUserToken()) return;

		const item = $cartItems[index];
		try {
			const success = await updateCartItem(item.id, change);

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

	async function handleBuyCart() {
		if (!getUserToken()) return;

		await fetchBuyCart().then((response) => {
			if (!response.ok) return;

			$cartItems = [];
			total = 0;
		});
	}

	$effect(async () => {
		if (!getUserToken()) return;

		const cartData = await fetchCartItems();
		if (cartData) {
			$cartItems = cartData.books.map((book) => ({
				id: book.id,
				title: book.title,
				price: book.price,
				quantity: book.quantity || 1
			}));
		}
	});

	$effect(() => {
		$itemCount = $cartItems.reduce((total, item) => total + item.quantity, 0);
	});
	let total = $state(0);
	$effect(() => {
		total = $cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
	});

	let showModal = $state(false);
	function toggleModal() {
		showModal = !showModal;
	}
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
	<div transition:fade={{ duration: 200 }} class="fixed left-0 top-0 h-full w-full">
		<button
			class="h-full w-full cursor-default bg-black bg-opacity-50"
			onclick={toggleModal}
			aria-label="Close modal"
		></button>
		<div
			class="absolute left-1/2 top-1/2 h-auto max-h-[60%] w-3/4 -translate-x-1/2 -translate-y-[60%] overflow-y-auto rounded-lg bg-white p-4 shadow-lg md:w-[35rem] md:-translate-y-1/2"
		>
			<h2 class="mb-3 text-xl font-bold text-primary-800">Your Cart</h2>
			{#if $cartItems.length === 0}
				<p class="text-primary-900">Your cart is empty.</p>
			{:else}
				<ul class="divide-y divide-gray-200">
					{#each $cartItems as item, index}
						<li class="flex flex-col justify-between py-2 sm:flex-row sm:items-center">
							<span class="font-medium text-primary-800">{item.title}</span>
							<div class="flex items-center justify-between sm:gap-3">
								<span class="text-primary-800">{(item.price * item.quantity).toFixed(2)} Ft</span>
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
								</div>
							</div>
						</li>
					{/each}
				</ul>
				<div
					class="mt-4 flex justify-between border-t border-gray-200 pt-2 font-bold text-primary-900"
				>
					<span>Total:</span>
					<span>
						{total} Ft
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
					onclick={handleBuyCart}
					class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-primary-700"
				>
					Checkout
				</button>
			</div>
		</div>
	</div>
{/if}
