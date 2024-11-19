/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
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
				// font_color: '#f3f3f9',
				// btn_primary: '#2e3338',
				// btn_hover: '#282e33',
				// dark: '#000000',
				// white: '#f3f6f9',
				// primary: {
				// 	100: '#d3d3d4',
				// 	200: '#a6a8a9',
				// 	300: '#7a7c7f',
				// 	400: '#4d5154',
				// 	500: '#212529',
				// 	600: '#1a1e21',
				// 	700: '#141619',
				// 	800: '#0d0f10',
				// 	900: '#070708'
				// },
				// secondary: {
				// 	100: '#d3d4d5',
				// 	200: '#a8a9ab',
				// 	300: '#7c7f82',
				// 	400: '#515458',
				// 	500: '#25292e',
				// 	600: '#1e2125',
				// 	700: '#16191c',
				// 	800: '#0f1012',
				// 	900: '#070809'
				// }
			}
		}
	},
	plugins: []
};
