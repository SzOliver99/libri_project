<script>
	import { base } from '$app/paths';
	import { ShoppingBasketIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserToken, updateCartItem, fetchCartItems, fetchProducts } from '$lib/api';

	
	const refreshCartItems = async (userToken) => {
		try {
			const cartData = await fetchCartItems(userToken);
			$cartItems = cartData.books.map((book) => ({
				id: book.id,
				title: book.title,
				price: book.price,
				quantity: book.quantity
			}));
			$itemCount = cartData.books.reduce((total, book) => total + (book.quantity), 0);
		} catch (error) {
			console.error('Error refreshing cart items:', error);
		}
	};
	
	const getObjectByTitle = (title) => {
		return $cartItems.find(item => item.title === title);
	};
	
	async function incrementQuantity(product) {
		await updateQuantity(product, 1);
	}

	async function decrementQuantity(product) {
		await updateQuantity(product, -1);
	}
	
	async function updateQuantity(product, change) {
		const userToken = getUserToken();
		if (!userToken) return;
		
		const item = getObjectByTitle(product.title) || product;
		try {
			const success = await updateCartItem(userToken, item.id, change);
			if (success) {
				await refreshCartItems(userToken);
				item.quantity = Math.max(0, item.quantity + change);
				$cartItems = [...$cartItems];
			}
		} catch (error) {
			console.error('Error updating quantity:', error);
		}
	}
	
	let products = [];
	onMount(async () => {
		const userToken = getUserToken();
		if (userToken) {
			await refreshCartItems(userToken);
		}

		products = await fetchProducts();
	});
</script>

<section class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
	{#each products as product}
		<div
			class="relative shadow p-3 rounded-2xl hover:-translate-y-1 duration-300 transition-all"
			data-sveltekit-preload-data="tap"
		>
			<a href={`${base}/products/${product.id}`}>
				<div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
					<img
						src={product.image_src}
						alt={product.title}
						class="h-full w-full object-cover object-center lg:h-full lg:w-full"
					/>
				</div>
				<div class="mt-4 mb-2 break-word overflow-hidden">
					<h3 class="text-slate-900 font-bold text-base md:text-lg">{product.title}</h3>
					<p class="text-xs md:text-sm text-slate-700">{product.author}</p>
				</div>
			</a>
			<div class="flex flex-col md:flex-row md:items-center justify-between">
				<p class="font-bold text-slate-900 text-lg md:text-xl">{product.price} Ft</p>
				<form on:submit|preventDefault={() => incrementQuantity(product)}>
					<input type="hidden" value={product.id} name="productId" />
					{#if !$cartItems.some((item) => item.title === product.title)}
						<button
							type="submit"
							class="hidden md:flex px-3 py-2 bg-primary-800 rounded-lg text-white gap-2 hover:bg-primary-700 duration-300 transition-all"
						><ShoppingBasketIcon stroke-width={1.5} />Kosárba</button>
						<button
							type="submit"
							class="md:hidden flex justify-center w-full px-3 py-2 bg-primary-800 rounded-lg text-white gap-2 hover:bg-primary-700 duration-300 transition-all"
						><ShoppingBasketIcon stroke-width={1.5} /></button>
					{:else}
						<div class="flex items-center w-full">
							<button
								class="px-3 py-2 bg-slate-300 rounded-l-lg font-semibold hover:bg-slate-400 active:bg-slate-200 transition-colors duration-200"
								type="button"
								on:click={() => decrementQuantity(product)}
							>
								-
							</button>
							<span class="flex justify-center w-full md:px-4 py-2 font-semibold bg-slate-200">
								{#key $cartItems}
									{getObjectByTitle(product.title)?.quantity}
								{/key}
							</span>
							<button
								class="px-3 py-2 bg-slate-300 rounded-r-lg font-semibold hover:bg-slate-400 active:bg-slate-200 transition-colors duration-200"
								type="button"
								on:click={() => incrementQuantity(product)}
							>
								+
							</button>
						</div>
					{/if}
				</form>
			</div>
		</div>
	{/each}
</section>
