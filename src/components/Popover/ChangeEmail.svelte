<script>
	import { getUserToken } from '$lib/api';
	import { notify } from '$lib/utils/notify';

	const { email } = $props();

	async function handleChangeEmail(event) {
		event.preventDefault();

		const response = await fetch(`/api/user/change/email`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getUserToken()
			},
			body: JSON.stringify({ new_email: newEmail.value, password: verifyPassword.value })
		});

		const data = await response.json();
		if (response.ok) {
			notify.success(data);
			event.target.hidePopover();
		} else {
			notify.error(data);
		}
	}
</script>

<div class="mb-5 flex flex-col rounded-lg bg-gray-50 p-3">
	<div class="block md:hidden">
		<div class="flex flex-row justify-between">
			<p class="content-center font-medium">Email</p>
			<button
				class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
				popovertarget="change-email"
			>
				Change
			</button>
		</div>
		<p class="text-sm text-gray-500">{email}</p>
	</div>
	<div class="hidden flex-row justify-between md:flex">
		<div>
			<p class="font-medium">Email</p>
			<p class="text-sm text-gray-500">{email}</p>
		</div>
		<button
			class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
			popovertarget="change-email"
		>
			Change
		</button>
	</div>
</div>

<form onsubmit={handleChangeEmail} popover id="change-email" class="rounded-lg p-10 shadow-lg">
	<h3 class="pb-3 font-bold">Change Password</h3>
	<div class="popover-content">
		<div class="mb-3">
			<label for="newEmail" class="block text-sm font-medium text-gray-700">New Email</label>
			<input
				type="email"
				id="newEmail"
				required
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
			/>
		</div>
		<div class="mb-3">
			<label for="verifyPassword" class="block text-sm font-medium text-gray-700"
				>Verify Password</label
			>
			<input
				type="password"
				id="verifyPassword"
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
