import * as Yup from 'yup';

import { REGEXP } from '@/constants/regexp.constants';
import { IRegisterForm } from '@/interfaces/auth.interface';

export const getRegisterSchema = (
	error: IntlMessages['form']['error'],
): Yup.ObjectSchema<IRegisterForm> => {
	return Yup.object().shape({
		name: Yup.string().required(error.name),

		email: Yup.string().required(error.email_req).matches(REGEXP.email, error.email_valid),

		avatarColor: Yup.string(),

		password: Yup.string().required(error.password).matches(REGEXP.password, error.password),

		confirmPassword: Yup.string()
			.required(error.password)
			.oneOf([Yup.ref<string>('password')], error.passDoNotMatch),
	});
};
