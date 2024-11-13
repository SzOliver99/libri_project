<script>
	import { getUserToken } from '$lib/api';

	async function handleDeleteAction(event) {
		const response = await fetch('/api/user/delete-account', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${getUserToken()}`
			}
		});
		const data = await response.json();
		console.log(data);

		if (response.ok) {
			alert('Account successfully deleted');

			// Sign out and redirect to main page
			localStorage.clear();
			window.location.href = '/';
		} else {
			alert(data);
		}
	}

	function handleCancelAction() {
		const popover = document.querySelector('#delete-account');
		popover.hidePopover();
	}
</script>

<div popover id="delete-account" class="justify-center rounded-lg p-10 text-center shadow-lg">
	<p>Are you sure you wanna to delete your account?</p>
	<p>The account will be deleted permanently!</p>
	<div class="mt-2 flex justify-center text-white">
		<button
			class="me-5 w-20 rounded-lg bg-red-950 py-2 hover:scale-105 hover:bg-red-900"
			onclick={handleDeleteAction}
			id="">Yes</button
		>
		<button
			class="w-20 rounded-lg bg-primary-700 hover:scale-105 hover:bg-primary-600"
			onclick={handleCancelAction}>No!</button
		>
	</div>
</div>
