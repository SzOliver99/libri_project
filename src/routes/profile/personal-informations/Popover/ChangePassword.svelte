<script>
	import { getUserToken } from '$lib/api';

	async function handleChangePassword(event) {
		const { old_password, new_password, confirm_password } = {
			old_password: oldPassword.value,
			new_password: newPassword.value,
			confirm_password: confirmPassword.value
		};

		if (new_password !== confirm_password) {
			// TODO: own design to notification
			alert('New passwords do not match!');
			return;
		}

		const response = await fetch(`/api/user/change-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${getUserToken()}`
			},
			body: JSON.stringify({ old_password, new_password })
		});
		const data = await response.json();

		// TODO: own design to notification
		alert(data);
		event.target.hidePopover();
	}
</script>

<form
	onsubmit={handleChangePassword}
	popover
	id="change-password"
	class="rounded-lg p-10 shadow-lg"
>
	<h3 class="pb-3 font-bold">Change Password</h3>
	<div class="popover-content">
		<div class="mb-3">
			<label for="oldPassword" class="block text-sm font-medium text-gray-700">Old Password</label>
			<input
				type="password"
				id="oldPassword"
				required
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
			/>
		</div>
		<div class="mb-3">
			<label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
			<input
				type="password"
				id="newPassword"
				required
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
			/>
		</div>
		<div class="mb-3">
			<label for="confirmPassword" class="block text-sm font-medium text-gray-700"
				>Confirm New Password</label
			>
			<input
				type="password"
				id="confirmPassword"
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
