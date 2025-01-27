/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				xsm: '375px',
				xmd: '900px',
				lg: '1200px'
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				primary: {
					50: '#f0fdfa',
					100: '#d8e8e0',
					200: '#b1d1c1',
					300: '#8abba3',
					400: '#63a484',
					500: '#3c8d65',
					600: '#307151',
					700: '#24553d',
					800: '#183828',
					900: '#0c1c14'
				}
			}
		}
	},
	plugins: []
};
