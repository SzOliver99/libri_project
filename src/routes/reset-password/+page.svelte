<script>
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let token = $page.url.searchParams.get('token');
	async function handleSubmit() {
		if (!token) {
			console.error('No token provided in URL');
			// You might want to handle this case, perhaps by redirecting the user
			goto(`${base}/forgot-password`);
			return;
		}
	}
</script>

<div class="min-h-screen bg-primary-500 flex items-center justify-center">
	<div class="bg-secondary-500 p-6 rounded-lg shadow-lg max-w-md w-full">
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-700">Reset Password</h1>
			<a class="w-[60px] py-1 text-center bg-btn_primary rounded font-bold" href="{base}/sign-in"
				>&#8617;</a
			>
		</div>

		<form method="POST" action="/api/reset-password?token={token}">
			<div class="mb-4">
				<label for="password" class="block text-white">Password</label>
				<input
					name="password"
					id="password"
					type="password"
					class="w-full bg-btn_primary px-4 py-2 rounded-lg focus:outline-none focus:shadow-lg"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="token" class="block text-white">Repeat Password</label>
				<input
					name="repeat_password"
					id="repeat_password"
					type="password"
					class="w-full bg-btn_primary px-4 py-2 rounded-lg focus:outline-none focus:shadow-lg"
					required
				/>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="w-1/2 bg-btn_primary p-2 rounded-lg hover:shadow-lg active:bg-btn_hover focus:shadow-lg duration-200"
				>
					Reset Password
				</button>
			</div>
		</form>
	</div>
</div>
