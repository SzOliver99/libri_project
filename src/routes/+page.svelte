<script>
	import { fetchBestSellers } from '$lib/api';
	import { onMount } from 'svelte';

	let featuredBooks = $state([]);
	onMount(async () => {
		featuredBooks = await fetchBestSellers();
	});
</script>

<svelte:head>
	<title>Főoldal</title>
</svelte:head>

<main class="min-h-screen">
	<section class="hero bg-primary text-primary-foreground py-20">
		<div class="container mx-auto px-4 text-center">
			<h1 class="mb-4 text-5xl font-bold">Library Basement</h1>
			<p class="mb-8 text-2xl">Fedezze fel következő kedvenc könyvét hangulatos menedékünkben</p>
			<a
				href="/products"
				class="text-nowrap rounded-lg bg-primary-800 px-8 py-3 text-white transition-all duration-300 hover:bg-primary-700"
				>Könyvek megtekintése
			</a>
		</div>
	</section>

	<section class="featured-books py-16">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-semibold text-gray-800">Kiemelt könyvek</h2>
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				{#each featuredBooks as book}
					<div
						class="book-card transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-105"
					>
						<img
							src={book.image_src || '/placeholder.svg'}
							alt={book.title}
							class="h-64 w-full object-contain"
						/>
						<div class="p-4">
							<h3 class="mb-1 text-lg font-semibold">{book.title}</h3>
							<p class="text-gray-600">{book.author}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="cta bg-secondary text-secondary-foreground py-16">
		<div class="container mx-auto px-4 text-center">
			<h2 class="mb-4 text-3xl font-semibold">Csatlakozz a könyvek világába</h2>
			<p class="mb-8 text-xl">Könyvek vásárlásához regisztráció szükséges.</p>
			<a
				href="/sign-up"
				class="text-nowrap rounded-lg bg-primary-800 px-8 py-3 text-white transition-all duration-300 hover:bg-primary-700"
				>Regisztráció
			</a>
		</div>
	</section>
</main>
