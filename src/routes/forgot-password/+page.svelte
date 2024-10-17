<script>
	import { base } from '$app/paths';

	let email = '';

	function handleSubmit() {
		// Implement password reset logic here
		console.log('Password reset requested for:', email);
	}
</script>

<section class="flex items-center justify-center sm:mt-8">
	<div
		class="p-6 rounded-lg shadow-lg max-w-md w-full hover:-translate-y-1 duration-300 transition-all"
	>
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-700">Forgot Password</h1>
		</div>

		<form method="POST" action="/api/forgot-password">
			<div class="mb-4">
				<label for="email">Email</label>
				<input
					name="email"
					id="email"
					type="email"
					class="w-full bg-btn_primary px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:shadow-lg"
					bind:value={email}
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
