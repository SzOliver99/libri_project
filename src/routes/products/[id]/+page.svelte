<script>
	import { ShoppingBasketIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserId, updateCartItem, fetchCartItems } from '$lib/api';

	const handleAddToCart = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const productId = +formData.get('productId');

		const userId = await getUserId();
		if (!userId) {
			console.error('Please login to add to cart');
			return;
		}

		const success = await updateCartItem(userId, productId, 1);
		if (success) {
			$itemCount += 1;
			await refreshCartItems(userId);
		}
	};

	const refreshCartItems = async (userId) => {
		try {
			const cartData = await fetchCartItems(userId);
			if (cartData) {
				$cartItems = cartData.books.map((book) => ({
					id: book.id,
					title: book.title,
					price: book.price,
					quantity: book.quantity || 1
				}));
				$itemCount = cartData.books.reduce((total, book) => total + (book.quantity || 1), 0);
			}
		} catch (error) {
			console.error('Error refreshing cart items:', error);
		}
	};

	export let data;
	let product = [];

	onMount(async () => {
		const userId = await getUserId();
		if (userId) {
			await refreshCartItems(userId);
		}

		product = await fetch(`/api/books/${data.productId}`).then((res) => res.json());
	});
</script>

<section
	class="grid grid-cols-1 md:grid-cols-2 group relative shadow p-3 rounded-2xl hover:-translate-y-1 duration-300 transition-all gap-6"
>
	<div class="aspect-square w-1/2 md:w-full overflow-hidden rounded-lg bg-gray-200">
		<img
			class="h-full w-full object-cover object-center lg:h-full lg:w-full"
			src={product.image_src}
			alt={product.title}
		/>
	</div>
	<div>
		<div class="mt-4 break-all">
			<h3 class="text-slate-900 text-2xl font-bold">{product.title}</h3>
			<div class="ml-2">
				<p class="text-sm text-slate-800 mb-2">{product.author}</p>
				<p class="text-sm text-slate-800">
					asdasdasdasdasdaaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
				</p>
			</div>
		</div>
		<div>
			<p class="font-bold text-slate-900 text-xl mt-4 ml-2">
				{product.price} Ft
			</p>
			<form on:submit={handleAddToCart} class="w-full">
				<input type="hidden" value={data.productId} name="productId" />
				<button
					type="submit"
					class="flex px-3 py-2 bg-primary-800 rounded-lg text-white gap-2 hover:bg-primary-700 duration-300 transition-all w-full justify-center"
					><ShoppingBasketIcon stroke-width={1.5} />Kosárba</button
				>
			</form>
		</div>
	</div>
</section>
