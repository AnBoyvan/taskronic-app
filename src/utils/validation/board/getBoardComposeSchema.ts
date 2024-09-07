import * as Yup from 'yup';

import { BoardColor } from '@/constants/board-colors.constants';
import { BoardCompose } from '@/types/board.interface';

export const getBoardComposeSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<BoardCompose> => {
	return Yup.object().shape({
		title: Yup.string().required(messages.title),
		description: Yup.string(),
		thumbImage: Yup.string(),
		bgImage: Yup.string(),
		textColor: Yup.string(),
		bgColor: Yup.mixed<BoardColor>(),
		private: Yup.boolean(),
	});
};
