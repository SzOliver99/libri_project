<script>
	import { getUserInfo, getUserToken } from '$lib/api';
	import { onMount } from 'svelte';
	import ChangePopover from './ChangePopover.svelte';

	function handleEditInfo() {
		isEditing = true;
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => {
			input.disabled = false;
		});
	}

	async function handleUpdateInfo(event) {
		isEditing = false;
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => {
			input.disabled = true;
		});

		const response = await fetch('/api/user/change-info', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${getUserToken()}`
			},
			body: JSON.stringify({ first_name: firstName.value, last_name: lastName.value, phone_number: phone.value })
		});
		console.log(await response.json());
	}

	let isEditing = false;
	let { first_name, last_name, phone_number } = '';
	onMount(async () => {
		const userInfo = await getUserInfo();

		({ first_name, last_name, phone_number } = userInfo);
	});
</script>

<div class="w-full max-w-2xl px-4">
	<h2 class="text-2xl font-bold mb-6">Personal Information</h2>

	<form on:submit|preventDefault={handleUpdateInfo} class="space-y-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700">First Name*</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					placeholder="John"
					value={first_name || ''}
					required
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>
			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name*</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					placeholder="Doe"
					value={last_name || ''}
					required
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">Phone Number*</label>
				<input
					type="tel"
					id="phone"
					name="phone_number"
					placeholder="+36 30 123 4567"
					value={phone_number || ''}
					required
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>
		</div>

		<!-- Submit Button -->
		<div class="flex justify-end">
			{#if isEditing}
				<button type="submit" class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all"> Save Changes </button>
			{:else}
				<button type="button" class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all" on:click={() => handleEditInfo()}> Edit Information </button>
			{/if}
		</div>
	</form>

	<!-- Change Password Section -->
	<div class="mt-10">
		<h3 class="text-xl font-semibold mb-4">Security</h3>
		<div class="flex mb-5 items-center justify-between p-3 bg-gray-50 rounded-lg">
			<div>
				<p class="font-medium">Username</p>
				<p class="text-sm text-gray-500">Last changed 3 months ago</p>
			</div>
			<button class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all" popovertarget="change-username"> Change Username </button>
		</div>
		<div class="flex mb-5 items-center justify-between p-3 bg-gray-50 rounded-lg">
			<div>
				<p class="font-medium">Email</p>
				<p class="text-sm text-gray-500">Last changed 3 months ago</p>
			</div>
			<button class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all" popovertarget="change-email"> Change Email </button>
		</div>
		<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
			<div>
				<p class="font-medium">Password</p>
				<p class="text-sm text-gray-500">Last changed 3 months ago</p>
			</div>
			<button class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all" popovertarget="change-password"> Change Password </button>
		</div>
	</div>
	<ChangePopover />
</div>
