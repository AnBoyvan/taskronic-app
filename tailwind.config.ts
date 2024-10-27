import type { Config } from 'tailwindcss';

import { boardColors } from './src/constants/board-colors.constants';
import { colorVariants } from './src/constants/color-variants.constants';
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
	safelist: [
		...createStyleSafeList(colorVariants),
		...createStyleSafeList(boardColors),
		'text-[#3f3f46]',
		'text-[#e4e4e7]',
		'text-[#fafafa]',
		'text-[#27272A]',
	],
	darkMode: ['class', 'class'],
	plugins: [
		nextui({
			layout: {
				radius: {
					small: '4px',
					medium: '8px',
					large: '16px',
				},
			},
			themes: {
				light: {
					colors: {
						foreground: {
							DEFAULT: '#3f3f46',
						},
						background: {
							DEFAULT: '#f9fafc',
						},
					},
				},
				dark: {
					colors: {
						foreground: {
							DEFAULT: '#b6bec9',
						},
						background: {
							DEFAULT: '#18181b',
						},
						content1: {
							DEFAULT: '#27272a',
						},
						default: {
							DEFAULT: '#52525b',
						},
					},
				},
			},
		}),
		require('tailwindcss-animate'),
	],
};
export default config;
