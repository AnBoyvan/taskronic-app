import * as Yup from 'yup';

import { CreateListDto, List } from '@/types/board.interface';

export const getUpdateListSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<List> => {
	return Yup.object().shape({
		_id: Yup.string().required(),
		label: Yup.string().min(3, messages.title).required(messages.title),
		bgColor: Yup.string().required(),
		textColor: Yup.string().required(),
		order: Yup.number().required(),
		archived: Yup.boolean().required(),
	});
};

export const getCreateListSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<CreateListDto> => {
	return Yup.object().shape({
		label: Yup.string().min(3, messages.title).required(messages.title),
		bgColor: Yup.string().required(),
		textColor: Yup.string().required(),
	});
};
