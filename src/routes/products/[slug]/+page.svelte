<script>
	import { base } from '$app/paths';
	import { ShoppingBasketIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(formData.get('productId'));
	};

	// const products = [
	// 	{
	// 		id: 1,
	// 		name: 'Könyv 1',
	// 		href: `${base}/products/1`,
	// 		imageSrc:
	// 			'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
	// 		price: 3500,
	// 		author: 'Author 1'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Könyv 2',
	// 		href: `${base}/products/2`,
	// 		imageSrc:
	// 			'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
	// 		price: 3500,
	// 		author: 'Author 2'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Könyv 2',
	// 		href: `${base}/products/2`,
	// 		imageSrc:
	// 			'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
	// 		price: 3500,
	// 		author: 'Author 2'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Könyv 2',
	// 		href: `${base}/products/2`,
	// 		imageSrc:
	// 			'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
	// 		price: 3500,
	// 		author: 'Author 2'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Könyv 2',
	// 		href: `${base}/products/2`,
	// 		imageSrc:
	// 			'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
	// 		price: 3500,
	// 		author: 'Author 2'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Könyv 2',
	// 		href: `${base}/products/2`,
	// 		imageSrc:
	// 			'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
	// 		price: 3500,
	// 		author: 'Author 2'
	// 	}
	// ];

	let product = [];
	onMount(async () => {
		product = await fetch(`/api/book/${data.productId}`).then((res) => res.json());
	});
</script>

<section
	class="grid grid-cols-1 md:grid-cols-2 group relative shadow p-3 rounded-2xl hover:-translate-y-1 duration-300 transition-all gap-6"
>
	<div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
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
				<input type="hidden" value={data.productId} title="productId" />
				<button
					type="submit"
					class="flex px-3 py-2 bg-primary-800 rounded-lg text-white gap-2 hover:bg-primary-700 duration-300 transition-all w-full justify-center"
					><ShoppingBasketIcon stroke-width={1.5} />Kosárba</button
				>
			</form>
		</div>
	</div>
</section>
