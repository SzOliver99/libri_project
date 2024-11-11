<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	$: filteredList = [];
	async function searchHandle(event) {
		// TODO: Implement searchBar
		console.log(event.target.value);
		const res = await fetch('/api/books/filter-by', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content: event.target.value })
		});
		filteredList = await res.json();
	}
	$: dispatch('update', { list: filteredList });
</script>

<div class="flex justify-center mb-6">
	<input
		type="search"
		on:keyup|preventDefault={(e) => searchHandle(e)}
		class="mt-1 block w-full px-3 py-3 pl-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
		placeholder="Search products or authors..."
	/>
</div>
