<script>
	import { base } from '$app/paths';
	import { ShoppingBasketIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { itemCount, cartItems } from '$lib/store';

	const getUserId = async () => {
		try {
			const token = localStorage.getItem('AuthorizationToken');
			const user = await fetch(`/api/user/protected`, {
				headers: {
					Authorization: `${token}`
				}
			}).then((res) => res.json());
			return user.id;
		} catch {
			return null;
		}
	};

	const createCart = async () => {
		await fetch(`/api/cart/${await getUserId()}`, {
			method: 'POST'
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let userId = await getUserId();

		if (userId) {
			const form = e.target.closest('form');
			const productId = form.querySelector('input[name="productId"]').value;
			let response = await fetch(`/api/cart/${userId}/book/${productId}`, {
				method: 'POST'
			});

			if (response.ok) {
				// Increment the cart count
				$itemCount += 1;
				// Refresh the cart items
				await refreshCartItems();
			}
		} else {
			console.error('Please login to add to cart');
		}
	};

	const refreshCartItems = async () => {
		const userId = await getUserId();
		try {
			const res = await fetch(`/api/cart/${userId}`);
			if (res.ok) {
				const data = await res.json();
				// Update the cartItems in the CartButton component
				// We should use a store to communicate with the CartButton component
				$cartItems = data.books.map((book) => ({
					id: book.id,
					title: book.title,
					price: book.price,
					quantity: book.quantity || 1
				}));
				// Update the itemCount as well
				$itemCount = data.books.reduce((total, book) => total + (book.quantity || 1), 0);
			}
		} catch (error) {
			console.error('Error refreshing cart items:', error);
		}
	};

	let products = [];
	onMount(async () => {
		let userId = await getUserId();

		if (userId) {
			// Check if cart exists, if not create it
			let cartResponse = await fetch(`/api/cart/${userId}`);

			if (!cartResponse.ok) {
				await createCart();
			} else {
				// If cart exists, get the current count
				await refreshCartItems();
			}
		}
		products = await fetch(`/api/books/`).then((res) => res.json());
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
				<form on:submit={handleSubmit}>
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
