import { useMessages } from 'next-intl';

import { getForgotPasswordSchema } from '@/utils/validation/getForgotPassword';
import { getLoginSchema } from '@/utils/validation/getLoginSchema';
import { getRegisterSchema } from '@/utils/validation/getRegisterSchema';
import { getResetPasswordSchema } from '@/utils/validation/getResetPasswordSchema';

export const useValidation = () => {
	const { validation } = useMessages() as IntlMessages;

	const registerSchema = getRegisterSchema(validation);

	const loginSchema = getLoginSchema(validation);

	const forgotPasswordSchema = getForgotPasswordSchema(validation);

	const resetPasswordSchema = getResetPasswordSchema(validation);

	return { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };
};
