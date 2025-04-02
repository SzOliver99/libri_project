<script>
	import { onMount } from 'svelte';
	let inputs = [];
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
				if (e.target.value === '') {
					// Check if the current input is empty
					inputs[index - 1].focus(); // Focus on the previous input
				} else {
					e.target.value = ''; // Clear the current input
				}
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
		e.preventDefault(); // Prevent the default paste behavior

		const text = e.clipboardData.getData('text'); // Get the pasted text
		const digits = text.match(/\d/g); // Extract digits from the pasted text

		if (digits) {
			const currentInputIndex = inputs.indexOf(e.target); // Get the index of the current input
			const remainingInputs = inputs.slice(currentInputIndex); // Get the remaining inputs from the current input onward

			// Fill the inputs with the pasted digits
			remainingInputs.forEach((input, index) => {
				if (index < digits.length) {
					input.value = digits[index]; // Fill each input with the corresponding digit
				} else {
					input.value = ''; // Clear any remaining inputs
				}
			});

			// Focus on the next input after pasting
			if (remainingInputs.length > digits.length) {
				remainingInputs[digits.length].focus();
			} else {
				submit.focus(); // Focus on the submit button if all inputs are filled
			}
		} else {
			console.error('Pasted content does not contain valid digits.'); // Log an error if no digits are found
		}
	};

	onMount(() => {
		inputs = [...document.querySelectorAll('input[name="numberInput"]')];
		submit = document.querySelector('#submitCode');

		// Ensure the first input is focused on mount
		if (inputs.length > 0) {
			inputs[0].focus();
		}
	});
</script>

<input
	name="numberInput"
	type="text"
	class="h-8 w-8 appearance-none rounded border border-transparent bg-slate-100 sm:p-1 md:p-4 text-center sm:text-base md:text-2xl font-extrabold text-slate-900 outline-none hover:border-slate-200 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 md:h-14 md:w-14"
	pattern="\d*"
	maxlength="1"
	required
	oninput={handleInput}
	onkeydown={handleKeyDown}
	onfocus={handleFocus}
	onpaste={handlePaste}
/>
