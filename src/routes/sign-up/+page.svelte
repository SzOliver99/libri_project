<script>
	import { goto } from '$app/navigation';
	import { fetchSignUp } from '$lib/api';
	import { notify } from '$lib/utils/notify';

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetchSignUp(email.value, username.value, password.value);

		const data = await response.json();
		if (!response.ok) {
			notify.error(data);
			return;
		}

		notify.success(data);
		goto('/sign-in');
	};
</script>

<svelte:head>
	<title>Regisztráció - Library Basement</title>
</svelte:head>

<section class="flex h-[calc(100vh-8rem)] items-center justify-center sm:mt-8 sm:h-auto">
	<div
		class="w-full max-w-md rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
	>
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-700">Regisztráció</h1>
		</div>

		<!-- Registration form -->
		<form onsubmit={handleSubmit}>
			<div class="mb-4">
				<label for="email" class="block text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					autocomplete="off"
				/>
			</div>

			<div class="mb-4">
				<label for="username" class="block text-gray-700">Felhasználónév</label>
				<input
					type="text"
					id="username"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					autocomplete="off"
				/>
			</div>

			<div class="mb-6">
				<label for="password" class="block text-gray-700">Jelszó</label>
				<input
					type="password"
					id="password"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
				/>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="rounded-lg bg-primary-800 px-8 py-2 text-white transition-all duration-300 hover:bg-primary-700"
				>
					Regisztráció
				</button>
			</div>
		</form>
	</div>
</section>
