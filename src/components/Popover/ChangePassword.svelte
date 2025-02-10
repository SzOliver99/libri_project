<script>
	import { fetchChangePassword, getUserToken } from '$lib/api';
	import { fade } from 'svelte/transition';
	import { notify } from '$lib/utils/notify';

	async function handleChangePassword(event) {
		event.preventDefault();
		if (newPassword.value !== confirmPassword.value) {
			notify.warning('A jelszavak nem egyeznek!');
			return;
		}

		const response = await fetchChangePassword(oldPassword.value, newPassword.value);
		const data = await response.json();

		if (!response.ok) {
			notify.error(data);
			return;
		}

		notify.success(data);
		toggleModal();
	}

	let showModal = $state(false);
	function toggleModal() {
		showModal = !showModal;
	}
</script>

<div
	class="mb-5 flex flex-col justify-between rounded-lg bg-gray-50 p-3 sm:flex sm:flex-row sm:items-center"
>
	<div>
		<p class="font-medium">Jelszó</p>
		<!-- <p class="text-sm text-gray-500">Last changed 3 months ago</p> -->
	</div>
	<button
		class="mt-2 rounded-lg bg-primary-800 px-4 py-2 text-white transition-all duration-300 hover:bg-primary-700 sm:mt-0"
		onclick={toggleModal}
	>
		Módosítás
	</button>
</div>

{#if showModal}
	<div transition:fade={{ duration: 200 }} class="fixed left-0 top-0 h-full w-full overflow-hidden">
		<button
			class="h-full w-full cursor-default bg-black bg-opacity-50"
			onclick={toggleModal}
			aria-label="Close modal"
		></button>
		<form
			onsubmit={handleChangePassword}
			class="absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-3 shadow-lg sm:w-auto"
		>
			<h3 class="pb-3 font-bold">Jelszó módosítása</h3>
			<div class="popover-content">
				<div class="mb-3">
					<label for="oldPassword" class="block text-sm font-medium text-gray-700"
						>Régi jelszó</label
					>
					<input
						type="password"
						id="oldPassword"
						required
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					/>
				</div>
				<div class="mb-3">
					<label for="newPassword" class="block text-sm font-medium text-gray-700">Új jelszó</label>
					<input
						type="password"
						id="newPassword"
						required
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					/>
				</div>
				<div class="mb-3">
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700"
						>Új jelszó megerősítése</label
					>
					<input
						type="password"
						id="confirmPassword"
						required
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					/>
				</div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
					>Módosítás</button
				>
			</div>
		</form>
	</div>
{/if}
