<script>
	import { getUserToken } from '$lib/api';
	import { notify } from '$lib/utils/notify';

	const { username } = $props();

	async function handleChangeUsername(event) {
		event.preventDefault();

		const response = await fetch(`/api/user/change/username`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getUserToken()
			},
			body: JSON.stringify({ new_username: username.value })
		});

		const data = await response.json();
		if (response.ok) {
			notify.success(data);
			event.target.hidePopover();
		} else {
			notify.error(data);
		}
		event.target.hidePopover();
	}
</script>

<div class="mb-5 flex flex-col sm:flex sm:flex-row sm:items-center justify-between rounded-lg bg-gray-50 p-3">
	<div>
		<p class="font-medium">Username</p>
		<p class="text-sm text-gray-500">{username}</p>
	</div>

	<button
		class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
		popovertarget="change-username"
	>
		Change
	</button>
</div>

<form
	onsubmit={handleChangeUsername}
	popover
	id="change-username"
	class="rounded-lg p-10 shadow-lg"
>
	<h3 class="pb-3 font-bold">Change Username</h3>
	<div class="popover-content">
		<div class="mb-3">
			<label for="username" class="block text-sm font-medium text-gray-700">New Username</label>
			<input
				type="text"
				id="username"
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
