<script>
	async function handleSubmit(e) {
		// Implement password reset logic here
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');

		let res = await fetch(`/api/user/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});
		if (res.ok) {
			alert('Password reset email sent');
			// window.location.href = `/sign-in`;
		} else {
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
					name="email"
					id="email"
					type="email"
					class="focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
					required
				/>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="bg-primary-800 hover:bg-primary-700 rounded-lg px-8 py-2 text-white transition-all duration-300"
				>
					Reset Password
				</button>
			</div>
		</form>
	</div>
</section>
