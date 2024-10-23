<script>
	import { base } from '$app/paths';
	import { ShoppingBasketIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserId, addToCart, fetchCartItems, fetchProducts } from '$lib/api';

	let products = [];

	const handleAddToCart = async (productId) => {
		const userId = await getUserId();
		if (!userId) {
			console.error('Please login to add to cart');
			return;
		}

		const success = await addToCart(userId, productId);
		if (success) {
			$itemCount += 1;
			await refreshCartItems(userId);
		}
	};

	const refreshCartItems = async (userId) => {
		try {
			const cartData = await fetchCartItems(userId);
			$cartItems = cartData.books.map((book) => ({
				id: book.id,
				title: book.title,
				price: book.price,
				quantity: book.quantity || 1
			}));
			$itemCount = cartData.books.reduce((total, book) => total + (book.quantity || 1), 0);
		} catch (error) {
			console.error('Error refreshing cart items:', error);
		}
	};

	onMount(async () => {
		const userId = await getUserId();
		if (userId) {
			await refreshCartItems(userId);
		}
		products = await fetchProducts();
	});
</script>

<section class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
	{#each products as product}
		<div
			class="group relative shadow p-3 rounded-2xl hover:-translate-y-1 duration-300 transition-all"
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
					<!-- <p class="text-sm text-slate-500 mb-1">
						asdasdasdasdasdaaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaa
					</p> -->
					<p class="text-xs md:text-sm text-slate-700">{product.author}</p>
				</div>
			</a>
			<div class="flex justify-between items-center">
				<p class="font-bold text-slate-900 text-lg md:text-xl">{product.price} Ft</p>
				<form on:submit={handleAddToCart}>
					<input type="hidden" value={product.id} name="productId" />
					<button
						type="submit"
						class="hidden md:flex px-3 py-2 bg-primary-800 rounded-lg text-white gap-2 hover:bg-primary-700 duration-300 transition-all"
						><ShoppingBasketIcon stroke-width={1.5} />Kosárba</button
					>
					<button
						type="submit"
						class="flex md:hidden px-3 py-2 bg-primary-800 rounded-lg text-white gap-2 hover:bg-primary-700 duration-300 transition-all"
						><ShoppingBasketIcon stroke-width={1.5} /></button
					>
				</form>
			</div>
		</div>
	{/each}
</section>
