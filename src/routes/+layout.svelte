<script>
	import '../app.css';
	import Navbar from '../components/Navbar/Navbar.svelte';
	import CartButton from '../components/CartButton.svelte';
	import { page } from '$app/stores';
	import { isAdmin } from '$lib/store';
	import Notification from '../components/Notification/Notification.svelte';

	const { children } = $props();
	let loggedIn = $state(false);
	$effect(async () => {
		const token = localStorage.getItem('AuthorizationToken');
		if (token !== null)
			await fetch('/api/user/protected', {
				method: 'GET',
				headers: {
					Authorization: token
				}
			}).then(async (response) => {
				if (response.ok) {
					// Check if user is Admin
					$isAdmin = await fetch('/api/user/is-admin', {
						method: 'GET',
						headers: {
							Authorization: token
						}
					}).then((response) => response.json());

					console.log('Logged in');
					loggedIn = response.ok;
				} else {
					// remove everything if user not logged in
					localStorage.clear();

					console.log('Your session expired please relogin');
					// TODO: Implement relogin
					window.location.href = '/';
				}
			});
		else {
			if (['/profile'].includes($page.url.pathname) && window.innerWidth > 768) {
				window.location.href = '/';
			}
		}
	});
</script>

<div id="app">
	<header>
		<Navbar />
	</header>

	<Notification />
	<main
		class="mx-auto max-w-7xl px-6 pb-24 {$page.url.pathname.includes('/profile')
			? 'md:pb-0'
			: 'md:pb-6'}"
		class:mt-6={!$page.url.pathname.includes('/profile')}
	>
		<!-- <slot /> -->
		{@render children()}
		{#if loggedIn === true && !$page.url.pathname.includes('/profile')}
			<CartButton />
		{/if}
	</main>

	{#if !['/sign-in', '/sign-up'].includes($page.url.pathname)}
		<footer class="bg-gray-800 py-12 text-white">
			<div class="container mx-auto px-4 text-center">
				<h2 class="mb-4 text-2xl font-semibold">Library Basement</h2>
				<p class="mb-4">Hangulatos könyves menedéked a város szívében.</p>
				<p class="mt-8">&copy; 2025 Library Basement. Minden jog fenntartva.</p>
			</div>
		</footer>
	{/if}
</div>
