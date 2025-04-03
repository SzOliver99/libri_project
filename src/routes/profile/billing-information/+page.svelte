<script>
import {
	fetchChangeBillingInformations,
	getUserInfo,
	getUserToken,
} from "$lib/api";
import { notify } from "$lib/utils/notify";

async function handleSubmit(event) {
	event.preventDefault();

	isEditing = !isEditing;
	const inputs = document.querySelectorAll("input");
	for (const input in inputs) {
		input.disabled = !isEditing;
	}

	const response = await fetchChangeBillingInformations(
		billingAddress.value,
		cityAddress.value,
		state.value,
		postalCode.value,
	);
	const data = await response.json();
	if (!response.ok) {
		notify.error(data);
		return;
	}

	notify.success(data);
}

const handleEditInfo = () => {
	isEditing = !isEditing;
	const inputs = document.querySelectorAll("input");
	for (const input in inputs) {
		input.disabled = !isEditing;
	}
};

let isEditing = $state(false);
</script>

<section class="w-full max-w-2xl px-4">
	<!-- Billing Section -->
	<h1 class="mb-6 text-2xl font-bold">Számlázási információk</h1>
	{#await getUserInfo() then userInfo}
		<form onsubmit={handleSubmit} class="space-y-6 rounded-lg bg-white p-3">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<!-- Billing Address -->
				<div>
					<label for="billingAddress" class="block text-sm font-medium text-gray-700">
						Számlázási cím*</label
					>
					<input
						type="text"
						id="billingAddress"
						placeholder="1234 Main St"
						value={userInfo.billing_address || ''}
						required
						disabled
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
					/>
				</div>

				<!-- City -->
				<div>
					<label for="cityAddress" class="block text-sm font-medium text-gray-700">Város*</label>
					<input
						type="text"
						id="cityAddress"
						placeholder="New York"
						value={userInfo.city || ''}
						required
						disabled
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
					/>
				</div>

				<!-- State/Province -->
				<div>
					<label for="state" class="block text-sm font-medium text-gray-700">Állam/tartomány</label>
					<input
						type="text"
						id="state"
						placeholder="NY"
						value={userInfo.state_province || ''}
						disabled
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
					/>
				</div>

				<!-- Postal Code -->
				<div>
					<label for="postalCode" class="block text-sm font-medium text-gray-700"
						>Irányítószám*</label
					>
					<input
						type="text"
						id="postalCode"
						placeholder="10001"
						value={userInfo.postal_code || ''}
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
	{/await}
</section>
