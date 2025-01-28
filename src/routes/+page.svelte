<script>
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let currentIndex = 0;
	import image1 from '$lib/images/a_vedelmezo_1216x480_360x440prim.png';
	import image2 from '$lib/images/het_negyzetmeter_1216x480_360x44.png';
	import image3 from '$lib/images/kekesteto_1216x480_360x440prima_.png';
	const books = [image1, image2, image3];

	const nextSlide = () => {
		currentIndex = (currentIndex + 1) % books.length;
	};

	const prevSlide = () => {
		currentIndex = (currentIndex - 1 + books.length) % books.length;
	};

	onMount(() => {
		setInterval(() => {
			currentIndex = (currentIndex + 1) % books.length;
		}, 5000);
	});
</script>

<svelte:head>
	<title>Kezdőlap</title>
</svelte:head>

<section class="container mx-auto px-4 py-10">
	<h1 class="mb-8 text-center text-4xl font-bold text-primary-500">
		Üdvözöljük a Library Basement-en!
	</h1>

	<div class="relative w-full overflow-hidden">
		<div
			class="flex transition-transform duration-500 ease-in-out"
			style="transform: translateX(-{currentIndex * 100}%);"
		>
			{#each books as book}
				<div class="min-w-full">
					<div class="flex h-full flex-col items-center rounded-lg bg-primary-100 text-center">
						<img src={book} alt="" />
					</div>
				</div>
			{/each}
		</div>

		<button
			on:click={prevSlide}
			class="absolute left-4 top-1/2 -translate-y-1/2 transform p-2 text-white transition-all duration-300 hover:text-gray-200"
		>
			<ChevronLeft strokeWidth={2} class="size-10" />
		</button>
		<button
			on:click={nextSlide}
			class="absolute right-4 top-1/2 -translate-y-1/2 transform p-2 text-white transition-all duration-300 hover:text-gray-200"
		>
			<ChevronRight strokeWidth={2} class="size-10" />
		</button>
	</div>
</section>
