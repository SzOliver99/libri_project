<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { BookOpen, HouseIcon, Info, ShoppingCart, UserIcon } from 'lucide-svelte';
	import NavMarker from './NavMarker.svelte';

	const navLinks = [
		{ href: `${base}/`, title: 'Homepage', icon: HouseIcon },
		{ href: `${base}/products`, title: 'Books', icon: BookOpen },
		{ href: `${base}/about-us`, title: 'About Us', icon: Info },
		{ href: `${base}/cart`, title: 'Cart', icon: ShoppingCart }
	];

	let navContainer;
</script>

<nav class="w-full text-slate-900 shadow">
	<div class="max-w-5xl justify-center items-center gap-4 p-3 mx-auto hidden md:flex">
		{#each navLinks as link}
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
		{/each}
		<div class="ml-0 lg:ml-16">
			<div class="flex items-center duration-300 transition-all">
				<UserIcon stroke-width={1.5} class="mx-auto md:me-2" />
				<p>
					<a
						href={`${base}/sign-in`}
						class="hover:text-primary-700 duration-300 transition-all {$page.url.pathname ===
						`${base}/sign-in`
							? 'text-primary-700'
							: 'text-slate-900'}">Login</a
					>
					/
					<a
						href={`${base}/sign-up`}
						class="hover:text-primary-700 duration-300 transition-all {$page.url.pathname ===
						`${base}/sign-up`
							? 'text-primary-700'
							: 'text-slate-900'}">Register</a
					>
				</p>
			</div>
		</div>
	</div>
	<div class="md:hidden flex justify-end">
		<a
			href={`${base}/sign-in`}
			class="flex px-3 py-3 text-slate-900 font-bold duration-300 transition-all"
		>
			<UserIcon stroke-width={1.5} />
			<p>Login / Register</p>
		</a>
	</div>
	<div
		bind:this={navContainer}
		class="md:hidden fixed bottom-0 left-0 z-50 w-full bg-white rounded-t-2xl shadow p-3 flex items-stretch justify-between gap-4 overflow-hidden"
	>
		<NavMarker {navLinks} {navContainer} />
		{#each navLinks as link}
			<a
				href={link.href}
				class="nav-link flex flex-col items-center px-3 py-2 rounded-lg hover:text-primary-700 duration-300 transition-all {$page
					.url.pathname === link.href
					? 'active text-primary-700'
					: 'text-primary-900'}"
			>
				<!-- <div class="mx-auto w-10 h-1 bg-primary-700 rounded-b-lg -translate-y-5"></div> -->
				<svelte:component this={link.icon} class="mx-auto md:me-2" stroke-width={1.5} />
				<p class="text-xs">{link.title}</p>
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
