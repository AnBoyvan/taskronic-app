import * as Yup from 'yup';

import { REGEXP } from '@/constants/regexp.constants';
import type { ForgotPassRequest } from '@/types/auth.interface';

export const getForgotPasswordSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<ForgotPassRequest> => {
	return Yup.object().shape({
		email: Yup.string().required(messages.email_req).matches(REGEXP.email, messages.email_valid),

		lang: Yup.string().required(),
	});
};
