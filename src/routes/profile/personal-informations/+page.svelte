<script>
	import { onMount } from 'svelte';
	import { getUserToken } from '$lib/api';
	import { applyAction } from '$app/forms';

	const handleUpdateInfo = async (e) => {
		e.preventDefault();
		isEditing = false;
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => {
			input.disabled = true;
		});
	};

	function handleEditInfo() {
		isEditing = true;
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => {
			input.disabled = false;
		});
	}

	async function handleChangePassword(e) {
		const formData = new FormData(e.currentTarget);
		const { oldPassword, newPassword, confirmPassword } = Object.fromEntries(formData.entries());

		if (newPassword !== confirmPassword) {
			alert('New passwords do not match!');
			return;
		}

		const response = await fetch('/api/user/change-password', {
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

	const getUserInfo = async () => {
		const response = await fetch('/api/user/info');
		const data = await response.json();
		return data;
	};

	let isEditing = false;
	onMount(async () => {
		const userInfo = await getUserInfo();
		console.log(userInfo);
	});
</script>

<div class="w-full max-w-2xl px-4">
	<h2 class="text-2xl font-bold mb-6">Personal Information</h2>

	<form on:submit|preventDefault={handleUpdateInfo} class="space-y-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- First Name -->
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
				<input
					type="text"
					id="firstName"
					placeholder="John"
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Last Name -->
			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
				<input
					type="text"
					id="lastName"
					placeholder="Doe"
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Email -->
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					placeholder="example@email.com"
					autocomplete="off"
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Phone Number -->
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
				<input
					type="tel"
					id="phone"
					placeholder="+36 30 123 4567"
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Username -->
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
				<input
					type="text"
					id="username"
					placeholder="johndoe123"
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
		<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
			<div>
				<p class="font-medium">Password</p>
				<p class="text-sm text-gray-500">Last changed 3 months ago</p>
			</div>
			<button class="bg-primary-800 text-white px-4 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all" popovertarget="change-password"> Change Password </button>
		</div>
	</div>
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
</div>
