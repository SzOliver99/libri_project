import { writable } from 'svelte/store';

function createNotificationStore() {
	const { subscribe, update } = writable([]);

	return {
		subscribe,
		add: (message, type = 'info', timeout = 3000) => {
			const id = crypto.randomUUID();

			update((notifications) => [
				...notifications,
				{
					id,
					message,
					type
				}
			]);

			if (timeout) {
				setTimeout(() => {
					update((notifications) => notifications.filter((notification) => notification.id !== id));
				}, timeout);
			}
		},
		remove: (id) => {
			update((notifications) => notifications.filter((notification) => notification.id !== id));
		}
	};
}

export const notifications = createNotificationStore();
