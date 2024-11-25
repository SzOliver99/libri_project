<script>
	import { CreditCard, FileUser, History, Menu, X } from 'lucide-svelte';

	const list = [
		{ href: '/profile', title: 'Personal Informations', icon: FileUser },
		{ href: '/profile/billing-information', title: 'Billing Information', icon: CreditCard },
		{ href: '/profile/history', title: 'Purchase History', icon: History }
	];

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
		class="absolute left-0 top-12 flex w-full flex-col items-start gap-3 rounded-b-lg bg-slate-100 p-4"
	>
		{#each list as item, index}
			<a href={item.href} class="flex flex-row align-middle">
				<item.icon class="me-3" />
				<p>{item.title}</p>
			</a>
			{#if index !== list.length - 1}
				<div class="w-full border-b-2"></div>
			{/if}
		{/each}
	</div>
{/if}
