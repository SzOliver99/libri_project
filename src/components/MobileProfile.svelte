<script>
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { CreditCard, FileUser, History, Menu, X } from 'lucide-svelte';

	const list = [
		{ href: '/profile', title: 'Személyes adatok', icon: FileUser },
		{ href: '/profile/billing-information', title: 'Számlázási adatok', icon: CreditCard },
		{ href: '/profile/history', title: 'Vásárlási előzmények', icon: History }
	];
	function handleButton(event, href) {
		goto(href, { replaceState: true });
		toggleMenu();
	}

	function fadeSlide(node, options) {
		const slideTrans = slide(node, options);
		return {
			duration: options.duration,
			css: (t) => `
				${slideTrans.css(t)}
			`
		};
	}

	function toggleMenu() {
		isActive = !isActive;
	}

	let isActive = $state(false);
</script>

<button onclick={toggleMenu}>
	{#if isActive !== true}
		<Menu />
	{:else}
		<X />
	{/if}
</button>

{#if isActive === true}
	<div
		class="fixed right-0 top-12 -z-10 flex w-full flex-col items-start gap-3 rounded-b-lg bg-slate-100 p-4 shadow-lg"
		transition:fadeSlide={{ duration: 250 }}
	>
		{#each list as item, index}
			<button
				onclick={(event) => handleButton(event, item.href)}
				class="flex flex-row align-middle"
			>
				<item.icon class="me-3" />
				<p>{item.title}</p>
			</button>
			{#if index !== list.length - 1}
				<div class="w-full border-b-2"></div>
			{/if}
		{/each}
	</div>
{/if}
