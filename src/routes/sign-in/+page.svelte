<script>
	import { notify } from '$lib/utils/notify';

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(`/api/user/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: username.value, password: password.value })
		});

		const data = await response.json();
		if (!response.ok) {
			notify.error(data);
			return;
		}

		localStorage.setItem('AuthorizationToken', `${data.token}`);
		window.location.href = '/';
	};
</script>

<svelte:head>
	<title>Sign-in Page</title>
</svelte:head>

<section class="flex h-[calc(100vh-8rem)] items-center justify-center sm:mt-8 sm:h-auto">
	<div
		class="w-full max-w-md rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
	>
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-700">Login</h1>
		</div>

		<!-- Login form -->
		<form onsubmit={handleSubmit}>
			<div class="mb-4">
				<label for="username">Username</label>
				<input
					name="username"
					id="username"
					type="text"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					autocomplete="off"
					required
				/>
			</div>

			<div class="mb-6">
				<label for="password">Password</label>
				<input
					name="password"
					id="password"
					type="password"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
					required
				/>
			</div>

			<div class="mb-2 mt-6 text-center">
				<a href="/forgot-password">Forgot Password?</a>
			</div>

			<div class="mb-5 text-center">
				<button
					type="submit"
					class="rounded-lg bg-primary-800 px-8 py-2 text-white transition-all duration-300 hover:bg-primary-700"
				>
					Sign in
				</button>
			</div>
			<a href="/verify-code" class="flex justify-center text-sm">Login with Email verification</a>
		</form>
	</div>
</section>
