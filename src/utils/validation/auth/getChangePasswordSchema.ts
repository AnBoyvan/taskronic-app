import * as Yup from 'yup';

import { REGEXP } from '@/constants/regexp.constants';
import { ChangePassForm } from '@/types/auth.interface';

export const getChangePasswordSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<ChangePassForm> => {
	return Yup.object().shape({
		password: Yup.string().required(messages.pass).matches(REGEXP.password, messages.pass),

		newPassword: Yup.string().required(messages.pass).matches(REGEXP.password, messages.pass),

		confirmNewPassword: Yup.string()
			.required(messages.pass)
			.oneOf([Yup.ref<string>('newPassword')], messages.passDoNotMatch),
	});
};
