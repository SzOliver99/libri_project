<script>
	import { base } from '$app/paths';

	let email = '';

	function handleSubmit() {
		// Implement password reset logic here
		console.log('Password reset requested for:', email);
        
	}
</script>

<div class="min-h-screen bg-primary-500 flex items-center justify-center">
	<div class="bg-secondary-500 p-6 rounded-lg shadow-lg max-w-md w-full">
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-700">Forgot Password</h1>
			<a class="w-[60px] py-1 text-center bg-btn_primary rounded font-bold" href="{base}/sign-in"
				>&#8617;</a
			>
		</div>

		<form method="POST" action="/api/forgot-password">
			<div class="mb-4">
				<label for="email" class="block text-white">Email</label>
				<input
					name="email"
					id="email"
					type="email"
					class="w-full bg-btn_primary px-4 py-2 rounded-lg focus:outline-none focus:shadow-lg"
					bind:value={email}
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
