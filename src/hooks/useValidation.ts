import { useMessages } from 'next-intl';

import { getForgotPasswordSchema } from '@/utils/validation/auth/getForgotPassword';
import { getLoginSchema } from '@/utils/validation/auth/getLoginSchema';
import { getRegisterSchema } from '@/utils/validation/auth/getRegisterSchema';
import { getResetPasswordSchema } from '@/utils/validation/auth/getResetPasswordSchema';

export const useValidation = () => {
	const { validation } = useMessages() as IntlMessages;

	const registerSchema = getRegisterSchema(validation);

	const loginSchema = getLoginSchema(validation);

	const forgotPasswordSchema = getForgotPasswordSchema(validation);

	const resetPasswordSchema = getResetPasswordSchema(validation);

	return { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };
};
