export const trailingSlash = 'always';

export function load() {
	if (typeof localStorage !== 'undefined') {
		const reloadPath = localStorage.getItem('sveltekit-reload');
		if (reloadPath) {
			localStorage.removeItem('sveltekit-reload');
			location.href = reloadPath;
		}
	}
}
