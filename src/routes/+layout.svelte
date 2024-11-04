<script>
	import '../app.css';
	import Navbar from '../components/Navbar/Navbar.svelte';
	import CartButton from '../components/CartButton.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(async () => {
		const token = localStorage.getItem('AuthorizationToken');
		if (token !== null)
			await fetch('/api/user/protected', {
				method: 'GET',
				headers: {
					Authorization: token
				}
			}).then((response) => {
				if (response.ok) {
					console.log('Logged in');
					loggedIn = response.ok;
				} else {
					// remove everything if user not logged in
					localStorage.clear();

					console.log('Your session expired please relogin');
					// TODO: Implement relogin
				}
			});
	});

	let loggedIn;
	$: loggedIn;
</script>

<div id="app">
	<Navbar />
	<main class="max-w-7xl mx-auto px-6 pt-6 pb-24 md:pb-6">
		<slot />
		{#if loggedIn === true && !$page.route.id.includes('/profile')}
			<CartButton />
		{/if}
	</main>
</div>
