<script>
	import { X } from 'lucide-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	let filteredList = $state([]);
	let showIcon = $state(false);
	let isFocused = $state(false);

	function handleFocus() {
		isFocused = true;
	}
	function handleBlur() {
		isFocused = false;
	}

	async function searchHandle(event) {
		showIcon = event.target.value.length > 0;
		const res = await fetch('/api/book/filter-by', {
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

<div class="relative mb-6 flex justify-center">
	<input
		type="search"
		id="input"
		onkeyup={searchHandle}
		onfocus={handleFocus}
		onblur={handleBlur}
		class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-3 pl-6 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 md:text-sm transition-colors duration-300"
		placeholder="Search products or authors..."
		oninput={(e) => (filteredList = e.target.value ? filteredList : [])}
	/>
	{#if showIcon}
		<X
			class="absolute right-4 top-[1.8rem] -translate-y-1/2 cursor-pointer transition-all duration-300 md:top-[1.7rem] {isFocused
				? 'text-primary-500'
				: 'text-gray-300'}"
			onclick={() => {
				input.value = '';
				showIcon = false;
			}}
		/>
	{/if}
</div>

<style>
	/* clears the ‘X’ from Internet Explorer */
	input[type='search']::-ms-clear,
	input[type='search']::-ms-reveal {
		appearance: none;
		width: 0;
		height: 0;
	}

	/* clears the ‘X’ from Chrome */
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		appearance: none;
	}
</style>
