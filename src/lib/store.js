// import { persisted } from 'svelte-persisted-store';
import { writable } from 'svelte/store';

export const itemCount = writable(0);
export const cartItems = writable([]);