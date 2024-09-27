<script>
	let categories = [
		{ name: 'Best Sellers', link: '#' },
		{ name: 'New Arrivals', link: '#' },
		{ name: 'Fiction', link: '#' },
		{ name: 'Non-Fiction', link: '#' }
	];

	let products = [
		{
			id: 1,
			title: 'Book Title 1',
			image: 'https://via.placeholder.com/150',
			price: '$19.99'
		},
		{
			id: 1,
			title: 'Book Title 1',
			image: 'https://via.placeholder.com/150',
			price: '$19.99'
		},
		{
			id: 1,
			title: 'Book Title 1',
			image: 'https://via.placeholder.com/150',
			price: '$19.99'
		},
		{
			id: 1,
			title: 'Book Title 1',
			image: 'https://via.placeholder.com/150',
			price: '$19.99'
		},
		{
			id: 1,
			title: 'Book Title 1',
			image: 'https://via.placeholder.com/150',
			price: '$19.99'
		},
		{
			id: 1,
			title: 'Book Title 1',
			image: 'https://via.placeholder.com/150',
			price: '$19.99'
		},
		{
			id: 2,
			title: 'Book Title 2',
			image: 'https://via.placeholder.com/150',
			price: '$15.99'
		}
	];

	let currentIndex = 0;
	let slides = [
		{
			id: 1,
			image: 'https://via.placeholder.com/1200x400/1f1f1f1/ff0000?text=Slide+1'
		},
		{
			id: 2,
			image: 'https://via.placeholder.com/1200x400/1f1f1f1/ffff00?text=Slide+2'
		},
		{
			id: 3,
			image: 'https://via.placeholder.com/1200x400/1f1f1f1/ff00ff?text=Slide+3'
		}
	];

	function nextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	}
</script>

<div class="w-[65%] m-auto bg-secondary shadow-md">
	<!-- Header -->
	<header>
		<div class="container mx-auto px-4 py-6 flex justify-between items-center">
			<div class="text-2xl font-bold">My Book Store</div>
			<nav class="space-x-4">
				{#each categories as category}
					<a href={category.link}>
						{category.name}
					</a>
				{/each}
			</nav>
			<div>
				<a href="asd">Sign In</a>
			</div>
		</div>
	</header>

	<div class="relative w-full mx-auto overflow-hidden">
		<!-- Carousel container -->
		<div
			class="flex h-[20rem] transition-transform duration-[400ms]"
			style="transform: translateX(-{currentIndex * 100}%);"
		>
			<!-- Carousel slides -->
			{#each slides as slide}
				<div class="min-w-full">
					<img src={slide.image} alt={`Slide ${slide.id}`} class="w-full h-full object-cover" />
				</div>
			{/each}
		</div>

		<!-- Previous button -->
		<button
			class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
			on:click={prevSlide}
		>
			&#10094;
		</button>

		<!-- Next button -->
		<button
			class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
			on:click={nextSlide}
		>
			&#10095;
		</button>

		<!-- Indicators -->
		<div class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
			{#each slides as slide, i}
				<div
					class={`w-3 h-3 rounded-full ${currentIndex === i ? 'bg-gray-800' : 'bg-gray-400'}`}
				></div>
			{/each}
		</div>
	</div>

	<!-- Products Grid -->
	<section class="container mx-auto px-4 py-12">
		<h2 class="text-2xl font-bold text-gray-800 mb-6">Featured Books</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
			{#each products as product}
				<div class="bg-primary shadow-lg rounded-lg overflow-hidden">
					<img src={product.image} alt={product.title} class="w-full h-48 object-cover" />
					<div class="p-4">
						<h3 class="text-lg font-semibold">{product.title}</h3>
						<p class="text-gray-600">{product.price}</p>
						<button
							class="mt-4 w-full bg-btn_primary hover:shadow-lg active:bg-btn_hover py-2 font-bold rounded-lg duration-200"
							>Add to Cart</button
						>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-gray-800 text-white py-6">
		<div class="container mx-auto px-4 text-center">
			<p>&copy; 2024 My Book Store. All Rights Reserved.</p>
		</div>
	</footer>
</div>
