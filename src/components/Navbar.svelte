<script>
	import { page } from '$app/stores';
	import { BookOpen, HouseIcon, Info, UserIcon } from 'lucide-svelte';
	import NavMarker from './NavMarker.svelte';
	import { onMount } from 'svelte';
	import { getUserToken } from '$lib/api';
	
	let navContainer;

	const navLinks = [
		{ href: `/`, title: 'Home', icon: HouseIcon },
		{ href: `/products`, title: 'Books', icon: BookOpen },
		{ href: `/about-us`, title: 'About Us', icon: Info },
		{ href: `/profile`, title: 'Profile', icon: UserIcon }
	];

	const handleSignOut = () => {
		localStorage.removeItem('AuthorizationToken');
		window.location.href = ``;
	};

	let loggedIn;
	onMount(async () => {
		loggedIn = getUserToken() ? true : false;
	});

</script>

<nav class="w-full text-slate-900 bg-white shadow sticky top-0 z-50">
	<div class="max-w-5xl justify-center items-center gap-4 p-2 mx-auto hidden md:flex">
		{#each navLinks as link}
			{#if link.title !== 'Profile'}
				<a
					href={link.href}
					class="flex px-3 py-2 rounded-lg hover:text-primary-700 duration-300 transition-all {$page
						.url.pathname === link.href
						? 'text-primary-700'
						: 'text-primary-900'}"
				>
					<svelte:component this={link.icon} class="mx-auto md:me-2" stroke-width={1.5} />
					<p>{link.title}</p>
				</a>
			{/if}
		{/each}
		<div class="ml-0 lg:ml-16">
			<div class="flex items-center duration-300 transition-all">
				{#if loggedIn === true}
					<a
						href="/profile"
						class="flex py-2 rounded-lg hover:text-primary-700 duration-300 transition-all {$page.url.pathname ===
						`/profile`
							? 'text-primary-700'
							: 'text-slate-900'}"
					>
						<UserIcon stroke-width={1.5} class="md:me-2" />
						<p>Profile</p>
					</a>
					<!-- <p>
						<button
							on:click={handleSignOut}
							class="hover:text-primary-700 duration-300 transition-all {$page.url.pathname ===
							``
								? 'text-primary-700'
								: 'text-slate-900'}">Sign Out</button
						>
					</p> -->
				{:else}
					<p class="flex items-center">
						<UserIcon stroke-width={1.5} class="md:me-2" />
						<a
							href={`/sign-in`}
							class="hover:text-primary-700 duration-300 transition-all {$page.url.pathname ===
							`/sign-in`
								? 'text-primary-700'
								: 'text-slate-900'}">Login</a
						>
						/
						<a
							href={`/sign-up`}
							class="hover:text-primary-700 duration-300 transition-all {$page.url.pathname ===
							`/sign-up`
								? 'text-primary-700'
								: 'text-slate-900'}">Register</a
						>
					</p>
				{/if}
			</div>
		</div>
	</div>
	{#if $page.url.pathname === '/profile' && loggedIn === false}
		<div class="md:hidden flex justify-end items-center">
			<a
				href={`/sign-in`}
				class="flex px-3 py-3 text-slate-900 font-bold duration-300 transition-all"
			>
				<UserIcon stroke-width={1.5} />
				<a
					href={`/sign-in`}
					class="hover:text-primary-700 duration-300 transition-all {$page.url.pathname ===
					`/sign-in`
						? 'text-primary-700'
						: 'text-slate-900'}">Login</a
				>
				/
				<a
					href={`/sign-up`}
					class="hover:text-primary-700 duration-300 transition-all {$page.url.pathname ===
					`/sign-up`
						? 'text-primary-700'
						: 'text-slate-900'}">Register</a
				>
			</a>
		</div>
	{:else if $page.url.pathname === '/profile' && loggedIn === true}
		<div class="md:hidden flex justify-end items-center">
			<button on:click={handleSignOut} class="px-4 py-3 rounded-lg">Sign Out</button>
		</div>
	{/if}
	<div
		bind:this={navContainer}
		class="md:hidden fixed bottom-0 left-0 z-1 w-full bg-white rounded-t-2xl shadow p-3 flex items-stretch justify-between gap-4 overflow-hidden"
	>
		<NavMarker {navLinks} {navContainer} />
		{#each navLinks as link}
			<a
				href={link.href}
				class="nav-link flex flex-col items-center px-2 py-2 rounded-lg hover:text-primary-700 duration-300 transition-all {$page
					.url.pathname === link.href
					? 'active text-primary-700'
					: 'text-primary-900'}"
			>
				<svelte:component this={link.icon} class="mx-auto md:me-2" stroke-width={1.5} />
				<p class="text-xs whitespace-nowrap">{link.title}</p>
				</a>
		{/each}
	</div>
</nav>

<!-- class="grid gap-1 px-3 py-2 justify-center duration-300 transition-all min-w-16 min-h-16 w-full {$page
	.url.pathname === link.href
	? 'text-primary-700'
	: 'text-slate-900'}" -->

<style>
	.nav-link {
		position: relative;
		z-index: 1;
	}
</style>
