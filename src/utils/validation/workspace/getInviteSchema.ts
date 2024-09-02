import * as Yup from 'yup';

import { REGEXP } from '@/constants/regexp.constants';

export const getInviteSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<{ email: string }> => {
	return Yup.object().shape({
		email: Yup.string().required(messages.email_req).matches(REGEXP.email, messages.email_valid),
	});
};
