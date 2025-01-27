<script>
	import { getUserInfo, getUserToken } from '$lib/api';
	import ChangeUsername from '../../components/Popover/ChangeUsername.svelte';
	import ChangeEmail from '../../components/Popover/ChangeEmail.svelte';
	import ChangePassword from '../../components/Popover/ChangePassword.svelte';
	import DeleteAccount from '../../components/Popover/DeleteAccount.svelte';
	import { notify } from '$lib/utils/notify';

	function handleEditInfo() {
		isEditing = true;
		const inputs = document.querySelectorAll('#informations input');
		inputs.forEach((input) => {
			input.disabled = !isEditing;
		});
	}

	function validatePhoneNumber(phoneNumber) {
		const phoneNumberRegex = /^\+36 \d{2} \d{3} \d{3,4}$/; // Only hungarian number
		return phoneNumberRegex.test(phoneNumber);
	}

	async function handleSubmit() {
		if (!validatePhoneNumber(phone.value)) {
			notify.error('Not valid phone number pattern');
			return;
		}

		isEditing = false;
		const inputs = document.querySelectorAll('#informations input');
		inputs.forEach((input) => {
			input.disabled = !isEditing;
		});

		const response = await fetch('/api/user/change/personal-information', {
			method: 'PUT',
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
		const data = await response.json();
		if (!response.ok) {
			notify.error(data);
			return;
		}

		notify.success(data);
	}

	let isEditing = $state(false);
</script>

<section class="w-full max-w-2xl px-4">
	<h2 class="mb-6 text-2xl font-bold">Személyes adatok</h2>

	{#await getUserInfo() then userInfo}
		<form id="informations" onsubmit={handleSubmit} class="space-y-6 rounded-lg bg-white p-3">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-700">Keresztnév*</label>
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
					<label for="lastName" class="block text-sm font-medium text-gray-700">Vezetéknév*</label>
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
					<label for="phone" class="block text-sm font-medium text-gray-700">Telefonszám*</label>
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
			<div class="flex flex-col">
				{#if isEditing}
					<button
						type="submit"
						class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
					>
						Változtatások mentése
					</button>
				{:else}
					<button
						type="button"
						class="rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700"
						onclick={handleEditInfo}
					>
						Adatok szerkesztése
					</button>
				{/if}
			</div>
		</form>

		<!-- Change Password Section -->
		<div class="mt-10">
			<h3 class="mb-4 text-xl font-semibold">Biztonság</h3>

			<ChangeUsername username={userInfo.username} />
			<ChangeEmail email={userInfo.email} />
			<ChangePassword />
			<DeleteAccount />
		</div>
	{/await}
</section>
