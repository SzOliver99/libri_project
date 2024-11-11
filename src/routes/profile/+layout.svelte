<script>
	import { getUserToken } from '$lib/api';
	import { onMount } from 'svelte';
	import { CreditCard, History, FileUser, Trash2, LogOut } from 'lucide-svelte';

	const handleSignOut = () => {
		localStorage.clear();
		window.location.href = '/';
	};

	const list = [
		{ href: '/profile/history', title: 'Purchase History', icon: History },
		{ href: '/profile/personal-informations', title: 'Personal Informations', icon: FileUser },
		{ href: '/profile/billing', title: 'Billing Information', icon: CreditCard },
		{ href: '/profile/delete-account', title: 'Delete Account', icon: Trash2 }
	];

	let loggedIn;
	onMount(async () => {
		loggedIn = getUserToken() ? true : false;
	});
</script>

<section>
	{#if loggedIn === true}
		<div class="hidden md:flex h-[calc(100vh-4rem)] mx-auto border-x-4 border-primary-700 p-6 overflow-hidden">
			<div class="flex flex-col min-w-56">
				<h1 class="text-2xl font-bold mb-4">Profile</h1>
				<div class="flex flex-col gap-4 h-full">
					{#each list as item}
						<a href={item.href} class="flex text-sm items-center px-3 bg-primary-800 text-white py-2 rounded-lg hover:scale-105 hover:bg-primary-700 duration-300 transition-all">
							<svelte:component this={item.icon} class="md:me-2" stroke-width={1.5} />
							{item.title}
						</a>
					{/each}

					<button
						class="flex items-center text-sm px-3 py-3 bg-red-950 text-white mt-auto rounded-lg hover:scale-105 hover:bg-red-800 active:bg-red-900 duration-300 transition-all"
						on:click={handleSignOut}
					>
						<LogOut class="me-2" />
						<p>Sign out</p>
					</button>
				</div>
			</div>
			<div class="border-l-2 border-slate-200 h-full mx-4"></div>
			<div class="w-full overflow-y-auto">
				<slot />
			</div>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center h-[calc(100vh-7rem)]">
			<h1 class="text-2xl font-bold">You are not logged in!</h1>
		</div>
	{/if}
</section>
