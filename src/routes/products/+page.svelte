<script>
	import { ShoppingBasketIcon } from 'lucide-svelte';
	import { itemCount, cartItems } from '$lib/store';
	import { getUserToken, updateCartItem, fetchCartItems, fetchProducts } from '$lib/api';
	import SearchBar from '../../components/SearchBar.svelte';
	import { notify } from '$lib/utils/notify';

	const refreshCartItems = async () => {
		const cartData = await fetchCartItems();
		$cartItems = cartData.books.map((book) => ({
			id: book.id,
			title: book.title,
			price: book.price,
			quantity: book.quantity
		}));
		$itemCount = cartData.books.reduce((total, book) => total + book.quantity, 0);
	};

	const getObjectByTitle = (title) => {
		return $cartItems.find((item) => item.title === title);
	};

	async function incrementQuantity(e, product) {
		e.preventDefault();
		await updateQuantity(product, 1);
	}

	async function decrementQuantity(e, product) {
		e.preventDefault();
		await updateQuantity(product, -1);
	}

	async function updateQuantity(product, change) {
		if (!getUserToken()) {
			notify.warning('Please login to add to cart');
			return;
		}

		const item = getObjectByTitle(product.title) || product;
		try {
			const success = await updateCartItem(item.id, change);
			if (success) {
				await refreshCartItems();
				item.quantity = Math.max(0, item.quantity + change);
				$cartItems = [...$cartItems];
			}
		} catch (error) {
			console.error('Error updating quantity:', error);
		}
	}

	function handleUpdate(event) {
		products = event.detail.list;
	}

	let products = $state();
	$effect(async () => {
		if (getUserToken()) {
			await refreshCartItems();
		}

		products = await fetchProducts();
	});
</script>

<svelte:head>
	<title>Products Page</title>
</svelte:head>

<SearchBar on:update={handleUpdate} />
<section class="grid grid-cols-1 gap-6 xsm:grid-cols-2 xmd:grid-cols-3 lg:grid-cols-4">
	{#each products as product}
		<div
			class="flex h-full flex-col rounded-2xl p-3 shadow transition-all duration-300 hover:-translate-y-1"
			data-sveltekit-preload-data="tap"
		>
			<a href={`/products/${product.id}`}>
				<div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
					<img
						src={product.image_src}
						alt={product.title}
						class="object h-full w-full object-contain lg:h-full lg:w-full"
					/>
				</div>
				<div class="break-word mb-2 mt-4 overflow-hidden">
					<h3 class="text-base font-bold text-primary-800 md:text-lg">{product.title}</h3>
					<p class="text-xs text-primary-900 md:text-sm">{product.author}</p>
				</div>
			</a>
			<div class="mt-auto flex flex-col justify-between md:flex-row md:items-center">
				<p class="text-lg font-bold text-primary-900 md:text-xl">{product.price} Ft</p>
				<input type="hidden" id="product" value={product} />
				<form onsubmit={(e) => incrementQuantity(e, product)}>
					{#if !$cartItems.some((item) => item.title === product.title)}
						<button
							type="submit"
							class="hidden gap-2 rounded-lg bg-primary-800 px-3 py-2 text-white transition-all duration-300 hover:bg-primary-700 md:flex"
							><ShoppingBasketIcon stroke-width={1.5} />Add to cart</button
						>
						<button
							type="submit"
							class="flex w-full justify-center gap-2 rounded-lg bg-primary-800 px-3 py-2 text-white transition-all duration-300 hover:bg-primary-700 md:hidden"
							><ShoppingBasketIcon stroke-width={1.5} /></button
						>
					{:else}
						<div class="flex w-full items-center">
							<button
								class="rounded-l-lg bg-slate-300 px-3 py-2 font-semibold transition-colors duration-200 hover:bg-slate-400 active:bg-slate-200"
								type="button"
								onclick={(e) => decrementQuantity(e, product)}
							>
								-
							</button>
							<span class="flex w-full justify-center bg-slate-200 py-2 font-semibold md:px-4">
								{#key $cartItems}
									{getObjectByTitle(product.title)?.quantity}
								{/key}
							</span>
							<button
								class="rounded-r-lg bg-slate-300 px-3 py-2 font-semibold transition-colors duration-200 hover:bg-slate-400 active:bg-slate-200"
								type="button"
								onclick={(e) => incrementQuantity(e, product)}
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
