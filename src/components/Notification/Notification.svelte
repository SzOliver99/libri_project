<script>
	import { notifications } from '$lib/stores/notificationStore.js';
	import { Ban, Check, Info, TriangleAlert, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	const types = [
		{ name: 'success', color: 'bg-primary-600 border-green-400', icon: Check },
		{ name: 'error', color: 'bg-red-800 border-red-400', icon: Ban },
		{ name: 'warning', color: 'bg-yellow-500 border-yellow-400', icon: TriangleAlert },
		{ name: 'info', color: 'bg-blue-500 border-blue-400', icon: Info }
	];

	function removeNotification(id) {
		notifications.remove(id);
	}
</script>

<div class="fixed right-0 top-5 z-50 space-y-2 px-5 md:top-20">
	{#each $notifications as { id, message, type } (id)}
		{@const currentType = types.find((t) => t.name === type)}
		<button
			on:click={() => removeNotification(id)}
			transition:fly={{ x: 30, duration: 300 }}
			class={`${currentType?.color} flex flex-col items-center gap-1 rounded-lg px-4 py-3 text-center text-white shadow-lg md:flex-row`}
		>
			<currentType.icon class="me-3" size={22} />
			<p class="text-sm">{message}</p>
		</button>
	{/each}
</div>
