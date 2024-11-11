<script>
	import { onMount } from 'svelte';
	import { getUserInfo, getUserToken } from '$lib/api';

	const handleUpdateInfo = async (event) => {
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
			body: JSON.stringify({ billing_address: billingAddress.value, city: cityAddress.value, state_province: state.value, postal_code: postalCode.value })
		});
		console.log(await response.json());
	};

	const handleEditInfo = () => {
		isEditing = true;
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => {
			input.disabled = false;
		});
	};

	let isEditing = false;
	let { billing_address, city, state_province, postal_code } = '';
	onMount(async () => {
		const userInfo = await getUserInfo();

		({ billing_address, city, state_province, postal_code } = userInfo);
	});
</script>

<div class="w-full max-w-2xl px-4">
	<!-- Billing Section -->
	<h1 class="text-2xl font-bold mb-6">Billing Information</h1>
	<form on:submit|preventDefault={handleUpdateInfo} class="space-y-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Billing Address -->
			<div>
				<label for="billingAddress" class="block text-sm font-medium text-gray-700">Billing Address*</label>
				<input
					type="text"
					id="billingAddress"
					placeholder="1234 Main St"
					value={billing_address || ''}
					required
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- City -->
			<div>
				<label for="cityAddress" class="block text-sm font-medium text-gray-700">City*</label>
				<input
					type="text"
					id="cityAddress"
					placeholder="New York"
					value={city || ''}
					required
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- State/Province -->
			<div>
				<label for="state" class="block text-sm font-medium text-gray-700">State/Province</label>
				<input
					type="text"
					id="state"
					placeholder="NY"
					value={state_province || ''}
					disabled
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
				/>
			</div>

			<!-- Postal Code -->
			<div>
				<label for="postalCode" class="block text-sm font-medium text-gray-700">Postal Code*</label>
				<input
					type="text"
					id="postalCode"
					placeholder="10001"
					value={postal_code || ''}
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
</div>
