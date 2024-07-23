import { useMessages } from 'next-intl';

import { getLoginSchema } from '@/utils/validation/getLoginSchema';
import { getRegisterSchema } from '@/utils/validation/getRegisterSchema';

import { Messages } from '../../i18n';

export const useValidation = () => {
	const messages = useMessages() as Messages;

	const registerSchema = getRegisterSchema(messages.form.error);

	const loginSchema = getLoginSchema(messages.form.error);

	return { registerSchema, loginSchema };
};
