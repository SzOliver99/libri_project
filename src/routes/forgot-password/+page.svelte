<script>
	async function handleSubmit(event) {
		event.preventDefault();
		// Implement password reset logic here

		let res = await fetch(`/api/user/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email.value })
		});
		if (res.ok) {
			// TODO: own design to notification
			alert('Password reset email sent');
		} else {
			// TODO: own design to notification
			alert('Failed to send password reset email');
		}
	}
</script>

<section class="flex h-[calc(100vh-8rem)] items-center justify-center sm:mt-8 sm:h-auto">
	<div
		class="w-full max-w-md rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
	>
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-700">Forgot Password</h1>
		</div>

		<form onsubmit={handleSubmit}>
			<div class="mb-4">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
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
