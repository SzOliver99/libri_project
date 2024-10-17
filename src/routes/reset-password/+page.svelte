<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	let token = $page.url.searchParams.get('token');
</script>

<section class="flex items-center justify-center sm:mt-8">
	<div
		class="p-6 rounded-lg shadow-lg max-w-md w-full hover:-translate-y-1 duration-300 transition-all"
	>
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-700">Reset Password</h1>
		</div>

		<form method="POST" action="/api/reset-password?token={token}">
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
