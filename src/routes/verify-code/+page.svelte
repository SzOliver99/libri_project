<script>
	import NumberInput from '../../components/NumberInput.svelte';

	async function handleSendCodeSubmit(event) {
		sendCode.classList.add('hidden');
		verifyCode.classList.remove('hidden');
	}
</script>

<section class="flex h-[calc(100vh-8rem)] items-center justify-center sm:mt-8 sm:h-auto">
	<div
		class="w-full max-w-md rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
	>
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-700">Login with Email verification</h1>
		</div>

		<form id="sendCode" class="hidden" onsubmit={handleSendCodeSubmit}>
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
					Send verification code
				</button>
			</div>
		</form>

		<form
			id="verifyCode"
			onsubmit={() => {
				console.log('asd');
			}}
		>
			<header class="mb-8">
				<p class="text-[15px] text-slate-500">
					Enter the 6-digit verification code that was sent to your email address.
				</p>
			</header>
			<div class="mb-10 flex items-center justify-center gap-3">
				{#each { length: 6 } as _, i}
					<NumberInput number={i + 1} />
				{/each}
			</div>

			<div class="text-center">
				<button
					id="submitCode"
					type="submit"
					class="rounded-lg bg-primary-800 px-8 py-2 text-white transition-all duration-300 hover:bg-primary-700"
				>
					Send verification code
				</button>
			</div>
		</form>
	</div>
</section>
