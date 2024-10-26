<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	let token = $page.url.searchParams.get('token');

	async function handleSubmit(e) {
		const formData = new FormData(e.currentTarget);
		const password = formData.get('password');
		if (password !== formData.get('repeat_password')) {
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
			alert('Password reset successful');
			window.location.href = `/sign-in`;
		} else {
			alert('Password reset failed');
		}
	};
</script>

<section class="flex items-center justify-center sm:mt-8">
	<div
		class="p-6 rounded-lg shadow-lg max-w-md w-full hover:-translate-y-1 duration-300 transition-all"
	>
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-700">Reset Password</h1>
		</div>

		<form on:submit={handleSubmit}>
			<div class="mb-4">
				<label for="password">Password</label>
				<input
					name="password"
					id="password"
					type="password"
					class="w-full bg-btn_primary px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:shadow-lg"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="token">Repeat Password</label>
				<input
					name="repeat_password"
					id="repeat_password"
					type="password"
					class="w-full bg-btn_primary px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:shadow-lg"
					required
				/>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="bg-primary-800 text-white px-8 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all"
				>
					Reset Password
				</button>
			</div>
		</form>
	</div>
</section>
