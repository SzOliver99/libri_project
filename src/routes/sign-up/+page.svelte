<script>
	import { base } from '$app/paths';

	const handleSubmit = async (e) => {
		const formData = new FormData(e.currentTarget);
		const { email, username, password } = Object.fromEntries(formData.entries());

		const res = await fetch(`/api/user/sign-up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, username, password })
		}).then((res) => res.json());
		window.location.href = `${base}/sign-in`;
	};
</script>

<section class="flex items-center justify-center sm:mt-8">
	<div
		class="p-6 rounded-lg shadow-lg max-w-md w-full hover:-translate-y-1 duration-300 transition-all"
	>
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-700">Register</h1>
		</div>

		<!-- Registration form -->
		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-4">
				<label for="email" class="block text-gray-700">Email</label>
				<input
					name="email"
					id="email"
					type="email"
					class="w-full bg-btn_primary px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:shadow-lg"
					autocomplete="off"
				/>
			</div>

			<div class="mb-4">
				<label for="username" class="block text-gray-700">Username</label>
				<input
					name="username"
					id="username"
					type="text"
					class="w-full bg-btn_primary px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:shadow-lg"
					autocomplete="off"
				/>
			</div>

			<div class="mb-6">
				<label for="password" class="block text-gray-700">Password</label>
				<input
					name="password"
					id="password"
					type="password"
					class="w-full bg-btn_primary px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:shadow-lg"
				/>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="bg-primary-800 text-white px-8 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all"
				>
					Sign Up
				</button>
			</div>
		</form>
	</div>
</section>
