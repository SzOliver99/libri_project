<script>
	import { base } from '$app/paths';
	import google_img from '../../lib/images/google_img.png';
	import facebook_img from '../../lib/images/facebook_img.png';
	import twitter_img from '../../lib/images/twitter_img.png';

	export let form;

	let different_methods = [
		{ name: 'Google', img: google_img, method: 'google', disabled: false },
		{ name: 'Facebook', img: facebook_img, method: 'facebook', disabled: true },
		{ name: 'Twitter', img: twitter_img, method: 'twitter', disabled: true }
	];
</script>

<div class="min-h-screen bg-primary flex items-center justify-center">
	<div class="bg-secondary p-6 rounded-lg shadow-lg max-w-md w-full">
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-700">Login</h1>
			<a class="w-[60px] py-1 text-center bg-btn_primary rounded font-bold" href={base}>&#8617;</a>
		</div>

		<!-- Display error messages if any -->
		{#if form?.missing}
			<p class="text-red-500 mb-4">The email field is required</p>
		{/if}
		{#if form?.incorrect}
			<p class="text-red-500 mb-4">Invalid credentials!</p>
		{/if}

		<!-- Login form -->
		<form>
			<div class="mb-4">
				<label for="email" class="block text-white">Email</label>
				<input
					name="email"
					id="email"
					type="email"
					class="w-full bg-btn_primary px-4 py-2 rounded-lg focus:outline-none focus:shadow-lg"
					value={form?.email ?? ''}
					autocomplete="off"
				/>
			</div>

			<div class="mb-6">
				<label for="password" class="block text-white">Password</label>
				<input
					name="password"
					id="password"
					type="password"
					class="w-full bg-btn_primary px-4 py-2 rounded-lg focus:outline-none focus:shadow-lg"
				/>
			</div>

			<div class="text-center mt-6 mb-2">
				<a href="#" class="text-white">Forgot Password?</a>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="w-1/3 bg-btn_primary py-2 rounded-lg hover:shadow-lg active:bg-btn_hover focus:shadow-lg duration-200"
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
</div>

<style lang="postcss">
	#different_auths img {
		width: 30px;
	}

	#different_auths img.grayscale {
		cursor: default;
	}
</style>
