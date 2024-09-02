import { ListColor, listColors } from '@/constants/list-colors.constants';

export const getColorName = (colorValue: string): ListColor => {
	for (const colorName in listColors) {
		if (listColors[colorName as ListColor].color === colorValue) {
			return colorName as ListColor;
		}
	}
	return 'default';
};
