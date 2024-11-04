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
		class="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
		placeholder="Search products..."
	/>
</div>
