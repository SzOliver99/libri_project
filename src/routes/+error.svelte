<script>
	import { Undo2 } from 'lucide-svelte';
</script>

<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="mb-4 text-base font-bold text-primary-800">404</p>
		<h1 class="mb-6 text-3xl font-bold text-slate-900 sm:text-5xl">Az oldal nem található</h1>
		<p class="text-base leading-7 text-gray-600">Sajnáljuk, nem találtuk a keresett oldalt.</p>
		<div class="mt-10 flex items-center justify-center">
			<a
				href="/"
				class="flex rounded-lg bg-primary-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
			>
				<Undo2 stroke-width={1.5} class="mx-auto md:me-2" />
				<p>Vissza a kezdőlapra</p>
			</a>
		</div>
	</div>
</main>
