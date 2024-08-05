import * as Yup from 'yup';

import { REGEXP } from '@/constants/regexp.constants';
import { IResetPassForm } from '@/interfaces/auth.interface';

export const getResetPasswordSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<IResetPassForm> => {
	return Yup.object().shape({
		token: Yup.string().required(),

		password: Yup.string().required(messages.pass).matches(REGEXP.password, messages.pass),

		confirmPassword: Yup.string()
			.required(messages.pass)
			.oneOf([Yup.ref<string>('password')], messages.passDoNotMatch),
	});
};
