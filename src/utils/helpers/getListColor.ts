import { listColors } from '@/constants/list-colors.constants';

type ColorFormat = 'hex' | 'rgb' | 'tw';

export const getListColor = (color: string, format: ColorFormat, theme?: string): string => {
	const listColor = listColors.find(i => i.color === color);

	if (format === 'tw') {
		return color.replace('bg-', '');
	}

	if (!listColor) {
		if (format === 'rgb') {
			return theme === 'dark' ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)';
		}
		return theme === 'dark' ? '#3f3f46' : '#e4e4e7';
	}

	if (listColor[format] === 'theme') {
		if (format === 'rgb') {
			return theme === 'dark' ? 'rgb(63, 63, 70)' : 'rgb(228, 228, 231)';
		}
		return theme === 'dark' ? '#3f3f46' : '#e4e4e7';
	}
	return listColor[format];
};
