<script>
	import { ShoppingBasketIcon } from 'lucide-svelte';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserToken, updateCartItem, fetchCartItems } from '$lib/api';
	import { notify } from '$lib/utils/notify.js';

	async function handleSubmit(event) {
		event.preventDefault();

		if (!getUserToken()) {
			notify.warning('Kérjük, jelentkezzen be a vásárláshoz');
			return;
		}

		const success = await updateCartItem(+data.bookData.id, 1);
		if (success) {
			$itemCount += 1;
			await refreshCartItems();
		}
	}

	const refreshCartItems = async () => {
		try {
			const cartData = await fetchCartItems();
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

	let { data } = $props();
	let product = $state(data.bookData);

	$effect(async () => {
		if (!getUserToken()) return;

		await refreshCartItems();
	});
</script>

<svelte:head>
	<title>Product - {product.title}</title>
</svelte:head>

<section
	class="hover:-tranprimary-y-1 group relative grid grid-cols-1 gap-6 rounded-2xl p-3 shadow transition-all duration-300 md:grid-cols-2"
>
	<div class="aspect-square overflow-hidden rounded-lg bg-gray-200 md:w-full">
		<img
			class="h-full w-full object-contain lg:h-full lg:w-full"
			src={product.image_src}
			alt={product.title}
		/>
	</div>
	<div class="flex h-[calc(100%-1rem)] flex-col">
		<div class="mt-4">
			<h3 class="mb-2 text-2xl font-bold text-primary-800">{product.title}</h3>
			<div class="ml-2">
				<p class="mb-2 text-sm text-primary-900">Szerző: {product.author}</p>
				<p class="mb-2 text-sm text-primary-900">Közzététel dátuma: {product.published_date}</p>
				<div class="text-sm text-primary-900">
					<p class="font-bold">Leírás:</p>
					<p class="ml-4">
						{product.description}
					</p>
				</div>
			</div>
		</div>
		<div class="mt-auto">
			<p class="ml-2 mt-4 text-xl font-bold text-primary-900">
				{product.price} Ft
			</p>
			<div class="my-2 w-full">
				<button
					class="flex w-full justify-center gap-2 rounded-lg bg-primary-800 px-3 py-2 text-white transition-all duration-300 hover:bg-primary-700"
					onclick={handleSubmit}><ShoppingBasketIcon stroke-width={1.5} />Kosárba</button
				>
			</div>
			<p class="ml-2 text-sm text-primary-900">ISBN: {product.isbn}</p>
		</div>
	</div>
</section>
