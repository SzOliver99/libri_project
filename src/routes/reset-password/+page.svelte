<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { notify } from '$lib/utils/notify';

	async function handleSubmit(event) {
		event.preventDefault();

		if (newPassword.value !== repeatPassword.value) {
			notify.error('Passwords do not match');
			return;
		}

		const response = await fetch(`/api/user/reset-password?token=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password: newPassword.value })
		});
		const data = await response.json();

		if (!response.ok) {
			notify.error(data);
			return;
		}

		notify.success(data);
		goto('/sign-in');
	}
	let token = $state();
	$effect(() => {
		token = $page.url.searchParams.get('token') || '';
	});
</script>

<svelte:head>
	<title>Reset password Page</title>
</svelte:head>

<section class="flex h-[calc(100vh-8rem)] items-center justify-center sm:mt-8 sm:h-auto">
	<div
		class="w-full max-w-md rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
	>
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-700">Reset Password</h1>
		</div>

		<form>
			<div class="mb-4">
				<label for="newPassword">Password</label>
				<input
					type="password"
					id="newPassword"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="repeatPassword">Repeat Password</label>
				<input
					type="password"
					id="repeatPassword"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					required
				/>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="rounded-lg bg-primary-800 px-8 py-2 text-white transition-all duration-300 hover:bg-primary-700"
					onclick={handleSubmit}
				>
					Reset Password
				</button>
			</div>
		</form>
	</div>
</section>
