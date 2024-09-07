import * as Yup from 'yup';

export const getCreateListSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<{ label: string }> => {
	return Yup.object().shape({
		label: Yup.string().required(messages.title),
	});
};
