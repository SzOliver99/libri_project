<script>
	import { getUserToken } from '$lib/api';
	import { onMount } from 'svelte';
	import { CreditCard, History, FileUser, Trash2, LogOut } from 'lucide-svelte';
	import { render } from 'svelte/server';
	import { page } from '$app/stores';

	const { children } = $props();

	const handleSignOut = () => {
		localStorage.clear();
		window.location.href = '/';
	};

	const list = [
		{ href: '/profile', title: 'Personal Informations', icon: FileUser },
		{ href: '/profile/billing-information', title: 'Billing Information', icon: CreditCard },
		{ href: '/profile/history', title: 'Purchase History', icon: History },
		{ title: 'Sign Out', icon: LogOut }
	];
	let currentPage = $state(list[0]);

	let loggedIn = $state();
	$effect(async () => {
		loggedIn = getUserToken() ? true : false;
	});

	$effect.pre(() => {
		currentPage = list.find((item) => item.href === $page.url.pathname);
	});
</script>

<svelte:head>
	<title>Profile - {currentPage.title}</title>
</svelte:head>

<section>
	{#if loggedIn === true}
		<div
			class="m-5 mx-auto flex h-full overflow-hidden rounded-lg bg-slate-200 p-6 md:h-[calc(100vh-6.5rem)]"
		>
			<div class="hidden min-w-56 flex-col md:flex">
				<h1 class="mb-4 text-2xl font-bold">Profile</h1>
				<div class="flex h-full flex-col gap-4">
					{#each list as item}
						{#if item.title === 'Sign Out'}
							<button
								class="mt-auto flex items-center rounded-lg bg-red-950 px-3 py-3 text-sm text-white transition-all duration-300 hover:scale-105 hover:bg-red-900"
								onclick={handleSignOut}
							>
								<item.icon class="me-2" />
								<p>Sign out</p>
							</button>
						{:else}
							<a
								href={item.href}
								class="flex items-center rounded-lg bg-primary-800 px-3 py-2 text-sm text-white transition-all duration-300 hover:scale-105 hover:bg-primary-700"
							>
								<item.icon class="md:me-2" stroke-width={1.5} />
								{item.title}
							</a>
						{/if}
					{/each}
				</div>
			</div>
			<div class="mx-4 hidden h-full border-l-2 border-slate-300 md:block"></div>
			<div class="w-full overflow-y-auto">
				{@render children()}
			</div>
		</div>
	{:else}
		<div class="flex h-[calc(100vh-7rem)] flex-col items-center justify-center">
			<h1 class="text-2xl font-bold">You are not logged in!</h1>
		</div>
	{/if}
</section>
