<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import CartButton from '../components/CartButton.svelte';
	import { onMount } from 'svelte';

	let loggedIn;

	onMount(async () => {
		loggedIn = localStorage.getItem('AuthorizationToken') ? true : false;
		if (!loggedIn) {
			localStorage.removeItem('cartItems');
			localStorage.removeItem('itemCount');
		}
	});

	$: loggedIn;
</script>

<div id="app">
	<Navbar />
	<main class="max-w-7xl mx-auto px-6 pt-6 pb-24 md:pb-6">
		<slot />
		{#if loggedIn === true}
			<CartButton />
		{/if}
	</main>
</div>
