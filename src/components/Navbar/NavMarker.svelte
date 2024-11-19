<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// export let navLinks;
	// export let navContainer;
	const { navLinks, navContainer } = $props();
	let marker;
	let activeIndex = $state(-1);

	$effect(() => {
		activeIndex = navLinks.findIndex((link) => $page.url.pathname === link.href);
	});

	function updateMarkerPosition() {
		if (navContainer) {
			const activeLink = navContainer.querySelector('.nav-link.active');
			if (activeLink) {
				const containerRect = navContainer.getBoundingClientRect();
				const linkRect = activeLink.getBoundingClientRect();

				navContainer.style.setProperty('--marker-width', `${linkRect.width}px`);
				navContainer.style.setProperty('--marker-left', `${linkRect.left - containerRect.left}px`);
			}
		}
	}

	function handleResize() {
		updateMarkerPosition();
	}

	onMount(() => {
		updateMarkerPosition();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	$effect(() => {
		updateMarkerPosition();
	});

	$effect(() => {
		if (activeIndex !== -1) {
			setTimeout(updateMarkerPosition, 0);
		}
	});
</script>

<svelte:window on:resize={handleResize} />

<div bind:this={marker} id="marker" class="bg-primary-700 absolute top-0 h-1 rounded-b-lg"></div>

<style lang="postcss">
	#marker {
		left: var(--marker-left, 0);
		width: var(--marker-width, 0);
		transition:
			left 0.3s ease,
			width 0.3s ease;
	}
</style>
