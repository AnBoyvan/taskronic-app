import * as Yup from 'yup';

import { List } from '@/types/board.interface';

export const getUpdateListSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<List> => {
	return Yup.object().shape({
		_id: Yup.string().required(),
		label: Yup.string().required(messages.title),
		bgColor: Yup.string().required(),
		textColor: Yup.string().required(),
		order: Yup.number().required(),
		archived: Yup.boolean().required(),
	});
};
