import * as Yup from 'yup';

import { REGEXP } from '@/constants/regexp.constants';
import { ILoginForm } from '@/interfaces/auth.interface';

export const getLoginSchema = (
	error: IntlMessages['form']['error'],
): Yup.ObjectSchema<ILoginForm> => {
	return Yup.object().shape({
		email: Yup.string().required(error.email_req).matches(REGEXP.email, error.email_valid),

		password: Yup.string().required(error.password).matches(REGEXP.password, error.password),
	});
};
