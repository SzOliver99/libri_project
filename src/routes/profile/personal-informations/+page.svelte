<script>
	import { getUserInfo, getUserToken } from '$lib/api';
	import ChangeUsername from './Popover/ChangeUsername.svelte';
	import ChangeEmail from './Popover/ChangeEmail.svelte';
	import ChangePassword from './Popover/ChangePassword.svelte';
	import DeleteAccount from './Popover/DeleteAccount.svelte';

	function handleEditInfo() {
		isEditing = true;
		const inputs = document.querySelectorAll('#informations input');
		inputs.forEach((input) => {
			input.disabled = false;
		});
	}

	function validatePhoneNumber(phoneNumber) {
		const phoneNumberRegex = /^\+36 \d{2} \d{3} \d{4}$/; // Only hungarian number
		return phoneNumberRegex.test(phoneNumber);
	}

	async function handleUpdateInfo() {
		isEditing = false;
		const inputs = document.querySelectorAll('#informations input');
		inputs.forEach((input) => {
			input.disabled = true;
		});

		if (!validatePhoneNumber(phone.value)) {
			alert('Not valid phone number pattern');
			return;
		}

		const response = await fetch('/api/user/change/personal-information', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${getUserToken()}`
			},
			body: JSON.stringify({
				first_name: firstName.value,
				last_name: lastName.value,
				phone_number: phone.value
			})
		});
	}

	let isEditing = $state(false);
</script>

<section class="w-full max-w-2xl px-4">
	<h2 class="mb-6 text-2xl font-bold">Personal Information</h2>

	{#await getUserInfo() then userInfo}
		<form id="informations" onsubmit={handleUpdateInfo} class="space-y-6 rounded-lg bg-white p-3">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-700">First Name*</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						placeholder="John"
						value={userInfo.first_name || ''}
						required
						disabled
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
					/>
				</div>
				<div>
					<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name*</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						placeholder="Doe"
						value={userInfo.last_name || ''}
						required
						disabled
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
					/>
				</div>
				<div>
					<label for="phone" class="block text-sm font-medium text-gray-700">Phone Number*</label>
					<input
						type="tel"
						id="phone"
						name="phone_number"
						placeholder="+36 30 123 4567"
						value={userInfo.phone_number || ''}
						required
						disabled
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
					/>
				</div>
			</div>

			<!-- Submit Button -->
			<div class="flex justify-end">
				{#if isEditing}
					<button
						type="submit"
						class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
					>
						Save Changes
					</button>
				{:else}
					<button
						type="button"
						class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
						onclick={handleEditInfo}
					>
						Edit Information
					</button>
				{/if}
			</div>
		</form>
	{/await}

	<!-- Change Password Section -->
	<div class="mt-10">
		<h3 class="mb-4 text-xl font-semibold">Security</h3>
		<div class="mb-5 flex items-center justify-between rounded-lg bg-gray-50 p-3">
			<div>
				<p class="font-medium">Username</p>
				<p class="text-sm text-gray-500">szoliver</p>
			</div>

			<button
				class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
				popovertarget="change-username"
			>
				Change
			</button>
		</div>
		<div class="mb-5 flex items-center justify-between rounded-lg bg-gray-50 p-3">
			<div>
				<p class="font-medium">Email</p>
				<p class="text-sm text-gray-500">oliver.szvetnyik@gmail.com</p>
			</div>
			<button
				class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
				popovertarget="change-email"
			>
				Change
			</button>
		</div>
		<div class="mb-5 flex items-center justify-between rounded-lg bg-gray-50 p-3">
			<div>
				<p class="font-medium">Password</p>
				<p class="text-sm text-gray-500">Last changed 3 months ago</p>
			</div>
			<button
				class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
				popovertarget="change-password"
			>
				Change
			</button>
		</div>
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
	</div>
	<!-- Popovers -->
	<div>
		<ChangeUsername />
		<ChangeEmail />
		<ChangePassword />
		<DeleteAccount />
	</div>
</section>
