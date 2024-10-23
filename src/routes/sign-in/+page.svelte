<script>
	import google_img from '$lib/images/google_img.png';
	import facebook_img from '$lib/images/facebook_img.png';
	import twitter_img from '$lib/images/twitter_img.png';

	let different_methods = [
		{ name: 'Google', img: google_img, method: 'google', disabled: false },
		{ name: 'Facebook', img: facebook_img, method: 'facebook', disabled: true },
		{ name: 'Twitter', img: twitter_img, method: 'twitter', disabled: true }
	];

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

		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

		const data = await res.json();
		localStorage.setItem('AuthorizationToken', `${data.token}`);
		window.location.href = '/';
	};

	async function signInWithGoogle() {}
</script>

<section class="flex items-center justify-center sm:mt-8">
	<div
		class="p-6 rounded-lg shadow-lg max-w-md w-full hover:-translate-y-1 duration-300 transition-all"
	>
		<div class="flex mb-6 justify-between items-center">
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
					class="w-full px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:shadow-lg"
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
					class="w-full px-3 py-2 rounded-lg shadow-inner focus:outline-none focus:shadow-lg"
					required
				/>
			</div>

			<div class="text-center mt-6 mb-2">
				<a href="/forgot-password">Forgot Password?</a>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="bg-primary-800 text-white px-8 py-2 rounded-lg hover:bg-primary-700 duration-300 transition-all"
				>
					Sign in
				</button>
			</div>

			<div class="text-center mt-5 mb-2">
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
			</div>
		</form>
	</div>
</section>

<style lang="postcss">
	#different_auths img {
		width: 30px;
	}

	#different_auths img.grayscale {
		cursor: default;
	}
</style>
