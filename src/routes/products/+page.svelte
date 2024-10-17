<script>
	import { base } from '$app/paths';
	import { ShoppingBasketIcon } from 'lucide-svelte';

	const products = [
		{
			id: 1,
			name: 'Könyv 1',
			href: `${base}/products/1`,
			imageSrc:
				'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: 3500,
			author: 'Author 1'
		},
		{
			id: 2,
			name: 'Könyv 2',
			href: `${base}/products/2`,
			imageSrc:
				'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: 3500,
			author: 'Author 2'
		},
		{
			id: 2,
			name: 'Könyv 2',
			href: `${base}/products/2`,
			imageSrc:
				'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: 3500,
			author: 'Author 2'
		},
		{
			id: 2,
			name: 'Könyv 2',
			href: `${base}/products/2`,
			imageSrc:
				'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: 3500,
			author: 'Author 2'
		},
		{
			id: 2,
			name: 'Könyv 2',
			href: `${base}/products/2`,
			imageSrc:
				'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: 3500,
			author: 'Author 2'
		},
		{
			id: 2,
			name: 'Könyv 2',
			href: `${base}/products/2`,
			imageSrc:
				'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
			price: 3500,
			author: 'Author 2'
		}
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(formData.get('productId'));
	};
</script>

<section class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
	{#each products as product}
		<div
			class="group relative shadow p-3 rounded-2xl hover:-translate-y-1 duration-300 transition-all"
		>
			<a href={product.href}>
				<div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
					<img
						src={product.imageSrc}
						alt={product.name}
						class="h-full w-full object-cover object-center lg:h-full lg:w-full"
					/>
				</div>
				<div class="mt-4 mb-2 break-word overflow-hidden">
					<h3 class="text-slate-900 font-bold text-lg">{product.name}</h3>
					<p class="text-sm text-slate-500 mb-1">
						asdasdasdasdasdaaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaa
					</p>
					<p class="text-sm text-slate-700">{product.author}</p>
				</div>
			</a>
			<div class="flex justify-between items-center">
				<p class="font-bold text-slate-900 text-xl">{product.price} Ft</p>
				<form on:submit={handleSubmit}>
					<input type="hidden" value={product.id} name="productId" />
					<button
						type="submit"
						class="flex px-3 py-2 bg-primary-800 rounded-lg text-white gap-2 hover:bg-primary-700 duration-300 transition-all"
						><ShoppingBasketIcon stroke-width={1.5} />Kosárba</button
					>
				</form>
			</div>
		</div>
	{/each}
</section>
