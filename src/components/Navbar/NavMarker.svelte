<script>
	import { page } from '$app/stores';
	import { afterUpdate, onMount } from 'svelte';

	export let navLinks;
	export let navContainer;
	let marker;
	let activeIndex = -1;

	$: {
		activeIndex = navLinks.findIndex((link) => $page.url.pathname === link.href);
	}

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

	afterUpdate(() => {
		updateMarkerPosition();
	});

	$: if (activeIndex !== -1) {
		setTimeout(updateMarkerPosition, 0);
	}
</script>

<svelte:window on:resize={handleResize} />

<div
	bind:this={marker}
	id="marker"
	class="absolute top-0 h-1 bg-primary-700 rounded-b-lg"
></div>

<style>
	#marker {
		left: var(--marker-left, 0);
		width: var(--marker-width, 0);
		transition:
			left 0.3s ease,
			width 0.3s ease;
	}
</style>
