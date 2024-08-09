import * as Yup from 'yup';

import { REGEXP } from '@/constants/regexp.constants';
import type { LoginForm } from '@/interfaces/auth.interface';

export const getLoginSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<LoginForm> => {
	return Yup.object().shape({
		email: Yup.string().required(messages.email_req).matches(REGEXP.email, messages.email_valid),

		password: Yup.string().required(messages.pass).matches(REGEXP.password, messages.pass),
	});
};
