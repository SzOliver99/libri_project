<script>
	import { getUserToken } from '$lib/api';
	import { notify } from '$lib/utils/notify';
	import NumberInput from '../../components/NumberInput.svelte';

	async function handleSendCodeSubmit(event) {
		let response = await fetch('/api/user/send-code/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email.value })
		});
		let data = await response.json();

		if (!response.ok) {
			notify.error(data);
			return;
		}

		toggleForm();
	}

	async function handleLoginSubmit(event) {
		event.preventDefault();

		const code = Array.from(document.querySelectorAll('input[name="numberInput"]'))
			.map((input) => input.value)
			.join('');

		let response = await fetch('/api/user/sign-in/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code })
		});
		let data = await response.json();
		if (!response.ok) {
			console.log(data);
			return;
		}

		localStorage.setItem('AuthorizationToken', `${data.token}`);
		window.location.href = '/';
	}

	function toggleForm() {
		codeSent = !codeSent;
	}

	let codeSent = $state(false);
</script>

<svelte:head>
	<title>Sign-in via Email</title>
</svelte:head>

<section class="flex h-[calc(100vh-8rem)] items-center justify-center sm:mt-8 sm:h-auto">
	<div
		class="w-full max-w-md rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
	>
		<div class="mb-6 flex items-center justify-between">
			<h1 class="text-2xl font-bold text-gray-700">Bejelentkezés e-mail azonósítóval</h1>
		</div>

		{#if codeSent === true}
			<form id="verifyCode" onsubmit={handleLoginSubmit}>
				<header class="mb-8">
					<p class="text-[15px] text-slate-500">
						Adja meg az e-mail címére küldött 6 számjegyű ellenőrző kódot.
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
						Ellenőrző kód küldése
					</button>
				</div>
			</form>
		{:else}
			<form id="sendCode" onsubmit={handleSendCodeSubmit}>
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
						Ellenőrző kód küldése
					</button>
				</div>
			</form>
		{/if}
	</div>
</section>
