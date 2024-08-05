import type { Config } from 'tailwindcss';

import { colorVariants } from './src/styles/colorVariants';
import { createStyleSafeList } from './src/utils/helpers/createStyleSafeList';

const { nextui } = require('@nextui-org/react');

const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	safelist: [...createStyleSafeList(colorVariants)],
	darkMode: 'class',
	plugins: [
		nextui({
			addCommonColors: true,
			themes: {
				light: {
					colors: {
						foreground: {
							DEFAULT: '#3f3f46',
						},
						background: {
							DEFAULT: '#fafafa',
						},
					},
				},
				dark: {
					colors: {
						foreground: {
							DEFAULT: '#e4e4e7',
						},
						background: {
							DEFAULT: '#27272a',
						},
					},
				},
			},
		}),
	],
};
export default config;
