<script>
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
		} catch (error) {
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

		const formData = new FormData(e.currentTarget);
		let response = await fetch(`/api/cart/${await getUserId()}/book/${formData.get('productId')}`, {
			method: 'POST'
		});

		if (response.ok) {
			// Increment the cart count
			$itemCount += 1;
			// Refresh the cart items
			await refreshCartItems();
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

	export let data;
	let product = [
		{
			id: 1,
			title: 'Book 1',
			price: 1000,
			image_src: 'https://via.placeholder.com/150'
		}
	];
	// let product = [];
	// onMount(async () => {
	// 	// Check if cart exists, if not create it
	// 	let cartResponse = await fetch(`/api/cart/${await getUserId()}`);

	// 	if (!cartResponse.ok) {
	// 		await createCart();
	// 	} else {
	// 		// If cart exists, get the current count
	// 		await refreshCartItems();
	// 	}

	// 	product = await fetch(`/api/books/${data.productId}`).then((res) => res.json());
	// });
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
			<form on:submit={handleSubmit} class="w-full">
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
