<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let filteredList = $state([]);
	async function searchHandle(event) {
		const res = await fetch('/api/books/filter-by', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content: event.target.value })
		});
		filteredList = await res.json();
	}
	$effect(() => {
		dispatch('update', { list: filteredList });
	});
</script>

<div class="mb-6 flex justify-center">
	<input
		type="search"
		onkeyup={searchHandle}
		class="focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 pl-6 shadow-sm focus:outline-none sm:text-sm"
		placeholder="Search products or authors..."
	/>
</div>
