<script>
	import { page } from '$app/stores';
	import { BookOpen, HouseIcon, Info, UserIcon } from 'lucide-svelte';
	import NavMarker from './NavMarker.svelte';
	import { getUserToken } from '$lib/api';

	let navContainer = $state();

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

	let loggedIn = $state();
	$effect(async () => {
		loggedIn = getUserToken() ? true : false;
	});
</script>

<nav class="sticky top-0 z-50 w-full bg-white text-slate-900 shadow">
	<div class="mx-auto hidden max-w-5xl items-center justify-center gap-4 p-3 md:flex">
		{#each navLinks as link}
			{#if link.title !== 'Profile'}
				<a
					href={link.href}
					class="flex rounded-lg px-3 py-2 transition-all duration-300 hover:text-primary-700 {$page
						.url.pathname === link.href
						? 'text-primary-700'
						: 'text-primary-900'}"
				>
					<link.icon class="mx-auto md:me-2" stroke-width={1.5} />
					<p>{link.title}</p>
				</a>
			{/if}
		{/each}
		<div class="ml-0 lg:ml-16">
			<div class="flex items-center transition-all duration-300">
				{#if loggedIn === true}
					<a
						href="/profile"
						class="flex rounded-lg py-2 transition-all duration-300 hover:text-primary-700 {$page
							.url.pathname === `/profile`
							? 'text-primary-700'
							: 'text-slate-900'}"
					>
						<UserIcon stroke-width={1.5} class="md:me-2" />
						<p>Profile</p>
					</a>
				{:else}
					<p class="flex items-center">
						<UserIcon stroke-width={1.5} class="md:me-2" />
						<a
							href={`/sign-in`}
							class="transition-all duration-300 hover:text-primary-700 {$page.url.pathname ===
							`/sign-in`
								? 'text-primary-700'
								: 'text-slate-900'}">Login</a
						>
						/
						<a
							href={`/sign-up`}
							class="transition-all duration-300 hover:text-primary-700 {$page.url.pathname ===
							`/sign-up`
								? 'text-primary-700'
								: 'text-slate-900'}">Register</a
						>
					</p>
				{/if}
			</div>
		</div>
	</div>
	{#if ['/profile', '/sign-in', '/sign-up'].includes($page.url.pathname) && loggedIn === false}
		<div class="flex items-center justify-end md:hidden">
			<div class="flex px-3 py-3 font-bold text-slate-900 transition-all duration-300">
				<UserIcon stroke-width={1.5} />
				<a
					href={`/sign-in`}
					class="transition-all duration-300 hover:text-primary-700 {$page.url.pathname ===
					`/sign-in`
						? 'text-primary-700'
						: 'text-slate-900'}">Login</a
				>
				/
				<a
					href={`/sign-up`}
					class="transition-all duration-300 hover:text-primary-700 {$page.url.pathname ===
					`/sign-up`
						? 'text-primary-700'
						: 'text-slate-900'}">Register</a
				>
			</div>
		</div>
	{:else if $page.url.pathname === '/profile' && loggedIn === true}
		<div class="flex items-center justify-end md:hidden">
			<button onclick={handleSignOut} class="rounded-lg px-4 py-3">Sign Out</button>
		</div>
	{/if}
	<div
		bind:this={navContainer}
		class="z-1 fixed bottom-0 left-0 flex w-full items-stretch justify-between gap-4 overflow-hidden rounded-t-2xl bg-white p-3 shadow md:hidden"
	>
		<NavMarker {navLinks} {navContainer} />
		{#each navLinks as link}
			<a
				href={link.href}
				class="nav-link flex flex-col items-center rounded-lg px-2 py-2 transition-all duration-300 hover:text-primary-700 {$page
					.url.pathname === link.href
					? 'active text-primary-700'
					: 'text-primary-900'}"
			>
				<link.icon class="mx-auto md:me-2" stroke-width={1.5} />
				<p class="whitespace-nowrap text-xs">{link.title}</p>
			</a>
		{/each}
	</div>
</nav>

<style>
	.nav-link {
		position: relative;
		z-index: 1;
	}
</style>
