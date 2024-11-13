<script>
	import { getUserToken } from '$lib/api';

	async function handleChangeEmail(event) {
		const response = await fetch(`/api/user/change-email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${getUserToken()}`
			},
			body: JSON.stringify({ old_email: oldEmail.value, new_email: newEmail.value })
		});
		const data = await response.json();
		if (response.ok) {
			// TODO: own design to notification
			alert('Email changed successfully!');
			event.target.hidePopover();
		} else {
			// TODO: own design to notification
			alert(data);
		}
	}
</script>

<form onsubmit={handleChangeEmail} popover id="change-email" class="rounded-lg p-10 shadow-lg">
	<h3 class="pb-3 font-bold">Change Password</h3>
	<div class="popover-content">
		<div class="mb-3">
			<label for="oldEmail" class="block text-sm font-medium text-gray-700">Old Email</label>
			<input
				type="email"
				id="oldEmail"
				required
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
			/>
		</div>
		<div class="mb-3">
			<label for="newEmail" class="block text-sm font-medium text-gray-700">New Email</label>
			<input
				type="email"
				id="newEmail"
				required
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
			/>
		</div>
		<button
			type="submit"
			class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
			>Change</button
		>
	</div>
</form>
