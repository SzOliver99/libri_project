<script>
	async function searchHandle(event) {
		// TODO: Implement searchBar
		console.log(event.target.value);
	}
</script>

<div class="flex justify-center mb-6">
	<input
		type="search"
		on:keyup|preventDefault={(e) => searchHandle(e)}
		class="mt-1 block w-full px-3 py-3 pl-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
		placeholder="Search products..."
	/>
</div>
