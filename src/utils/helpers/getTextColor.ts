import { ColorInput, mostReadable } from '@ctrl/tinycolor';

import { BoardColor } from '@/constants/board-colors.constants';

const colors = ['#3f3f46', '#e4e4e7'];

const lightVariants = [
	'blue',
	'purple',
	'green',
	'red',
	'pink',
	'yellow',
	'gradient2',
	'gradient4',
	'gradient5',
	'gradient6',
	'gradient7',
	'gradient10',
];

const darkVariants = [
	'cyan',
	'zinc',
	'stone',
	'fuchsia',
	'indigo',
	'gradient1',
	'gradient3',
	'gradient8',
	'gradient9',
	'gradient11',
	'gradient12',
];

export const getTextColor = ({
	color,
	boardColor,
}: {
	color?: ColorInput;
	boardColor?: BoardColor;
}): string => {
	if (boardColor) {
		if (lightVariants.includes(boardColor)) return 'text-[#27272A]';
		if (darkVariants.includes(boardColor)) return 'text-[#fafafa]';
	}

	if (color) {
		const textColor = mostReadable(color, colors, { includeFallbackColors: true })?.toHexString();

		return `text-[${textColor}]`;
	}

	return '';
};
