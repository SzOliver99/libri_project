<script>
</script>

<div>MainPage</div>
<button
	on:click={() => {
		localStorage.removeItem('AuthorizationToken');
		window.location.href = `/`;
	}}
>
	Sign Out
</button>

<style>
</style>
