<script>
	import { fetchDeleteAccount, getUserToken } from '$lib/api';
	import { fade } from 'svelte/transition';
	import { notify } from '$lib/utils/notify';

	async function handleDeleteAction() {
		const response = await fetchDeleteAccount();
		const data = await response.json();

		if (!response.ok) {
			notify.error(data);
		}

		notify.success(data);

		// Sign out and redirect to main page
		localStorage.clear();
		window.location.href = '/';
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
		<p class="font-medium">Fiók törlése</p>
		<p class="text-sm text-gray-500">Ez a folyamat véglegesen törli a fiókod!</p>
	</div>
	<button
		class="mt-2 rounded-lg bg-red-950 px-4 py-2 text-white transition-all duration-300 hover:bg-red-900 sm:mt-0"
		onclick={toggleModal}
	>
		Törlés
	</button>
</div>

{#if showModal}
	<div transition:fade={{ duration: 200 }} class="fixed left-0 top-0 h-full w-full overflow-hidden">
		<button
			class="h-full w-full cursor-default bg-black bg-opacity-50"
			onclick={toggleModal}
			aria-label="Close modal"
		></button>
		<div
			class="absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg sm:w-auto"
		>
			<p>Biztos vagy benne hogy kitörlöd a profilod?</p>
			<p>A profil véglegesen törölve lesz!</p>
			<div class="mt-2 flex justify-center text-white">
				<button
					class="me-5 w-20 rounded-lg bg-red-950 py-2 hover:scale-105 hover:bg-red-900"
					onclick={handleDeleteAction}>Igen</button
				>
				<button
					class="w-20 rounded-lg bg-primary-700 hover:scale-105 hover:bg-primary-600"
					onclick={toggleModal}>Nem!</button
				>
			</div>
		</div>
	</div>
{/if}
