import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		paths: {
			base: dev ? '' : '/libri_project'
		},
		adapter: adapter({
			fallback: '404.html'
		})
	}
};

export default config;
