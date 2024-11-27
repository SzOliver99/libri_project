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

		if (response.ok) {
			// TODO: own design to notification
			alert('Account successfully deleted');

			// Sign out and redirect to main page
			localStorage.clear();
			window.location.href = '/';
		} else {
			// TODO: own design to notification
			alert(data);
		}
	}

	function handleCancelAction() {
		const popover = document.querySelector('#delete-account');
		popover.hidePopover();
	}
</script>

<div class="flex items-center justify-between rounded-lg bg-gray-50 p-3">
	<div>
		<p class="font-medium">Delete Account</p>
		<p class="text-sm text-gray-500">It will delete your account permanently!</p>
	</div>
	<button
		class="rounded-lg bg-red-950 px-4 py-2 text-white transition-all duration-300 hover:bg-red-900"
		popovertarget="delete-account"
	>
		Delete
	</button>
</div>

<div popover id="delete-account" class="justify-center rounded-lg p-10 text-center shadow-lg">
	<p>Are you sure you wanna to delete your account?</p>
	<p>The account will be deleted permanently!</p>
	<div class="mt-2 flex justify-center text-white">
		<button
			class="me-5 w-20 rounded-lg bg-red-950 py-2 hover:scale-105 hover:bg-red-900"
			onclick={handleDeleteAction}>Yes</button
		>
		<button
			class="w-20 rounded-lg bg-primary-700 hover:scale-105 hover:bg-primary-600"
			onclick={handleCancelAction}>No!</button
		>
	</div>
</div>
