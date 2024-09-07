import * as Yup from 'yup';

import { TaskCreate } from '@/types/tasks.interface';

export const getTaskCreateSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<TaskCreate> => {
	return Yup.object().shape({
		title: Yup.string().required(messages.title),
		list: Yup.string().required(),
	});
};
