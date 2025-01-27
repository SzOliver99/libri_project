import { notifications } from '$lib/stores/notificationStore.js';

export const notify = {
	success: (message) => notifications.add(message, 'success'),
	error: (message) => notifications.add(message, 'error'),
	warning: (message) => notifications.add(message, 'warning'),
	info: (message) => notifications.add(message, 'info')
};
