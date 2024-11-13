<script>
	import { getUserToken } from '$lib/api';

	async function handleChangeUsername(event) {
		const response = await fetch(`/api/user/change-username`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${getUserToken()}`
			},
			body: JSON.stringify({ username: username.value })
		});
		const data = await response.json();

		// TODO: own design to notification
		alert(data);
		event.target.hidePopover();
	}
</script>

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
