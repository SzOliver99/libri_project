<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
</script>

<div id="app">
	<Navbar />
	<main class="max-w-7xl mx-auto px-6 pt-6 pb-24 md:pb-0">
		<slot />
	</main>
</div>
