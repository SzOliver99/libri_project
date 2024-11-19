<script>
	import { onMount } from 'svelte';
	let inputs;
	let submit;

	const handleKeyDown = (e) => {
		if (
			!/^[0-9]{1}$/.test(e.key) &&
			e.key !== 'Backspace' &&
			e.key !== 'Delete' &&
			e.key !== 'Tab' &&
			!e.metaKey
		) {
			e.preventDefault();
		}

		if (e.key === 'Delete' || e.key === 'Backspace') {
			const index = inputs.indexOf(e.target);
			if (index > 0) {
				inputs[index - 1].value = '';
				inputs[index - 1].focus();
			}
		}
	};

	const handleInput = (e) => {
		const { target } = e;
		const index = inputs.indexOf(target);
		if (target.value) {
			if (index < inputs.length - 1) {
				inputs[index + 1].focus();
			} else {
				submit.focus();
			}
		}
	};

	const handleFocus = (e) => {
		e.target.select();
	};

	const handlePaste = (e) => {
		e.preventDefault();

		const text = e.clipboardData.getData('text');
		if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
			return;
		}
		const digits = text.split('');
		inputs.forEach((input, index) => (input.value = digits[index]));
		submit.focus();
	};

	onMount(() => {
		inputs = [...document.querySelectorAll('#numberInput')];
		submit = document.querySelector('#submitCode');
	});
</script>

<input
	id="numberInput"
	type="text"
	class="h-14 w-14 appearance-none rounded border border-transparent bg-slate-100 p-4 text-center text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
	pattern="\d*"
	maxlength="1"
	oninput={handleInput}
	onkeydown={handleKeyDown}
	onfocus={handleFocus}
	onpaste={handlePaste}
/>
