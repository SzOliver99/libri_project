<script>
	import { base } from '$app/paths';

	export let form;
</script>

<div class="min-h-screen flex items-center justify-center bg-primary">
	<div class="bg-secondary p-6 rounded-lg shadow-lg max-w-md w-full">
		<div class="flex mb-6 justify-between items-center">
			<h1 class="text-2xl font-bold text-gray-800">Register</h1>
			<a class="w-[60px] py-1 text-center bg-btn_primary rounded font-bold" href={base}>&#8617;</a>
		</div>

		<!-- Display error messages if any -->
		{#if form?.missing}
			<p class="text-red-500 mb-4">All fields are required</p>
		{/if}
		{#if form?.emailTaken}
			<p class="text-red-500 mb-4">This email is already registered!</p>
		{/if}

		<!-- Registration form -->
		<form>
			<div class="mb-4">
				<label for="name" class="block text-gray-700">Name</label>
				<input
					name="name"
					id="name"
					type="text"
					class="w-full bg-btn_primary px-4 py-2 rounded-lg focus:outline-none focus:shadow-lg"
					value={form?.name ?? ''}
					autocomplete="off"
				/>
			</div>

			<div class="mb-4">
				<label for="email" class="block text-gray-700">Email</label>
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
				<label for="password" class="block text-gray-700">Password</label>
				<input
					name="password"
					id="password"
					type="password"
					class="w-full bg-btn_primary px-4 py-2 rounded-lg focus:outline-none focus:shadow-lg"
				/>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="w-1/3 bg-btn_primary py-2 rounded-lg hover:shadow-lg active:bg-btn_hover focus:shadow-lg duration-200"
				>
					Register
				</button>
			</div>
		</form>
	</div>
</div>
