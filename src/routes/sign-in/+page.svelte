<script>
	import google_img from '$lib/images/google_img.png';
	import facebook_img from '$lib/images/facebook_img.png';
	import twitter_img from '$lib/images/twitter_img.png';

	// let different_methods = [
	// 	{ name: 'Google', img: google_img, method: 'google', disabled: false },
	// 	{ name: 'Facebook', img: facebook_img, method: 'facebook', disabled: true },
	// 	{ name: 'Twitter', img: twitter_img, method: 'twitter', disabled: true }
	// ];

	const handleSubmit = async (e) => {
		const formData = new FormData(e.currentTarget);
		const { username, password } = Object.fromEntries(formData.entries());
		const res = await fetch(`/api/user/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (!res.ok) {
			alert('Invalid username or password');
			return;
		}

		const data = await res.json();
		localStorage.setItem('AuthorizationToken', `${data.token}`);
		window.location.href = '/';
	};

	async function signInWithGoogle() {}
</script>

<section class="flex h-[calc(100vh-8rem)] items-center justify-center sm:mt-8 sm:h-auto">
	<div
		class="w-full max-w-md rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
	>
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-700">Login</h1>
		</div>

		<!-- Login form -->
		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-4">
				<label for="username">Username</label>
				<input
					name="username"
					id="username"
					type="text"
					class="focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
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
					class="focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
					required
				/>
			</div>

			<div class="mb-2 mt-6 text-center">
				<a href="/forgot-password">Forgot Password?</a>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="bg-primary-800 hover:bg-primary-700 rounded-lg px-8 py-2 text-white transition-all duration-300"
				>
					Sign in
				</button>
			</div>

			<!-- <div class="text-center mt-5 mb-2">
				<p>or</p>
			</div>

			<div id="different_auths" class="flex justify-center gap-5">
				{#each different_methods as method}
					<button
						type="button"
						on:click={() => {
							if (method.disabled) method.method;
						}}
					>
						<img
							src={method.img}
							alt={method.name}
							class={`${method.disabled ? 'grayscale' : ''}`}
						/>
					</button>
				{/each}
			</div> -->
		</form>
	</div>
</section>

<!-- <style lang="postcss">
	#different_auths img {
		width: 30px;
	}

	#different_auths img.grayscale {
		cursor: default;
	}
</style> -->
