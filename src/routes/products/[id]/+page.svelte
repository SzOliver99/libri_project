<script>
	import { ShoppingBasketIcon } from 'lucide-svelte';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserToken, updateCartItem, fetchCartItems } from '$lib/api';

	async function handleSubmit(event) {
		event.preventDefault();

		const userToken = getUserToken();
		if (!userToken) {
			console.error('Please login to add to cart');
			return;
		}

		const success = await updateCartItem(userToken, +data.bookData.id, 1);
		if (success) {
			$itemCount += 1;
			await refreshCartItems(userToken);
		}
	}

	const refreshCartItems = async (userToken) => {
		try {
			const cartData = await fetchCartItems(userToken);
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
		const userToken = getUserToken();
		if (userToken) {
			await refreshCartItems(userToken);
		}
	});
</script>

<section
	class="group relative grid grid-cols-1 gap-6 rounded-2xl p-3 shadow transition-all duration-300 hover:-translate-y-1 md:grid-cols-2"
>
	<div class="aspect-square w-1/2 overflow-hidden rounded-lg bg-gray-200 md:w-full">
		<img
			class="h-full w-full object-contain lg:h-full lg:w-full"
			src={product.image_src}
			alt={product.title}
		/>
	</div>
	<div class="flex h-[calc(100%-2rem)] flex-col">
		<div class="mt-4 break-all">
			<h3 class="text-2xl font-bold text-slate-900">{product.title}</h3>
			<div class="ml-2">
				<p class="mb-2 text-sm text-slate-800">{product.author}</p>
				<p class="text-sm text-slate-800">
					asdasdasdasdasdaaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
				</p>
			</div>
		</div>
		<div class="mt-auto">
			<p class="ml-2 mt-4 text-xl font-bold text-slate-900">
				{product.price} Ft
			</p>
			<form onsubmit={handleSubmit} class="w-full">
				<button
					type="submit"
					class="flex w-full justify-center gap-2 rounded-lg bg-primary-800 px-3 py-2 text-white transition-all duration-300 hover:bg-primary-700"
					><ShoppingBasketIcon stroke-width={1.5} />Kosárba</button
				>
			</form>
		</div>
	</div>
</section>
