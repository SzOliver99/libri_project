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

<section class="flex items-center justify-center sm:mt-8">
	<div
		class="p-6 rounded-lg shadow-lg max-w-md w-full hover:-translate-y-1 duration-300 transition-all"
	>
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-700">Forgot Password</h1>
		</div>

		<form on:submit={handleSubmit}>
			<div class="mb-4">
				<label for="email">Email</label>
				<input
					name="email"
					id="email"
					type="email"
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
