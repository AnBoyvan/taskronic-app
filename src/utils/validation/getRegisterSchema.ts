import * as Yup from 'yup';

import { REGEXP } from '@/constants/regexp.constants';
import { IRegisterForm } from '@/interfaces/auth.interface';

export const getRegisterSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<IRegisterForm> => {
	return Yup.object().shape({
		name: Yup.string().required(messages.name),

		email: Yup.string().required(messages.email_req).matches(REGEXP.email, messages.email_valid),

		avatarColor: Yup.string(),

		password: Yup.string().required(messages.pass).matches(REGEXP.password, messages.pass),

		confirmPassword: Yup.string()
			.required(messages.pass)
			.oneOf([Yup.ref<string>('password')], messages.passDoNotMatch),
	});
};
