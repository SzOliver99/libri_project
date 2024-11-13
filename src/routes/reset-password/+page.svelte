<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	let token = $page.url.searchParams.get('token');

	async function handleSubmit(e) {
		const formData = new FormData(e.currentTarget);
		const password = formData.get('password');
		if (password !== formData.get('repeat_password')) {
			// TODO: own design to notification
			alert('Passwords do not match');
			return;
		}

		let res = await fetch(`/api/user/reset-password?token=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		});

		if (res.ok) {
			// TODO: own design to notification
			alert('Password reset successful');
			window.location.href = `/sign-in`;
		} else {
			// TODO: own design to notification
			alert('Password reset failed');
		}
	}
</script>

<section class="flex h-[calc(100vh-8rem)] items-center justify-center sm:mt-8 sm:h-auto">
	<div
		class="w-full max-w-md rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
	>
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-700">Reset Password</h1>
		</div>

		<form on:submit={handleSubmit}>
			<div class="mb-4">
				<label for="password">Password</label>
				<input
					name="password"
					id="password"
					type="password"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="token">Repeat Password</label>
				<input
					name="repeat_password"
					id="repeat_password"
					type="password"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					required
				/>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="rounded-lg bg-primary-800 px-8 py-2 text-white transition-all duration-300 hover:bg-primary-700"
				>
					Reset Password
				</button>
			</div>
		</form>
	</div>
</section>
