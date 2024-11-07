<script>
	import { getUserToken } from '$lib/api';

	export let type;

	async function handleChangePassword(e) {
		const formData = new FormData(e.currentTarget);
		const { oldPassword, newPassword, confirmPassword } = Object.fromEntries(formData.entries());

		if (newPassword !== confirmPassword) {
			alert('New passwords do not match!');
			return;
		}

		const response = await fetch(`/api/user/change-${type}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${getUserToken()}`
			},
			body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
		});
		const data = await response.json();
		if (response.ok) {
			console.log('Password changed successfully!');
			e.target.hidePopover();
		} else {
			console.log();
		}
	}
</script>

<form on:submit|preventDefault={handleChangePassword} popover id="change-password" class="p-10 shadow-lg rounded-lg">
	<h3 class="pb-3 font-bold">Change Password</h3>
	<div class="popover-content">
		<div class="mb-3">
			<label for="old-password" class="block text-sm font-medium text-gray-700">Old Password</label>
			<input
				type="password"
				id="old-password"
				name="oldPassword"
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
			/>
		</div>
		<div class="mb-3">
			<label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
			<input
				type="password"
				id="new-password"
				name="newPassword"
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
			/>
		</div>
		<div class="mb-3">
			<label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
			<input
				type="password"
				id="confirm-password"
				name="confirmPassword"
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
			/>
		</div>
		<button
			type="submit"
			class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
			popovertargetaction="hide">Change Password</button
		>
	</div>
</form>
