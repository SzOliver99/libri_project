import { writable } from 'svelte/store';

export const itemCount = writable(0);
export const cartItems = writable([]);
export const isAdmin = writable(false);
