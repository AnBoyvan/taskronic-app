import { useMessages } from 'next-intl';

import { getForgotPasswordSchema } from '@/utils/validation/auth/getForgotPassword';
import { getLoginSchema } from '@/utils/validation/auth/getLoginSchema';
import { getRegisterSchema } from '@/utils/validation/auth/getRegisterSchema';
import { getResetPasswordSchema } from '@/utils/validation/auth/getResetPasswordSchema';
import { getBoardComposeSchema } from '@/utils/validation/board/getBoardComposeSchema';
import {
	getCreateListSchema,
	getUpdateListSchema,
} from '@/utils/validation/board/getListComposeSchema';
import { getInviteSchema } from '@/utils/validation/workspace/getInviteSchema';
import { getWorkspaceComposeSchema } from '@/utils/validation/workspace/getWorkspaceComposeSchema';

export const useValidation = () => {
	const { validation } = useMessages() as IntlMessages;

	const registerSchema = getRegisterSchema(validation);
	const loginSchema = getLoginSchema(validation);
	const forgotPasswordSchema = getForgotPasswordSchema(validation);
	const resetPasswordSchema = getResetPasswordSchema(validation);

	const boardComposeSchema = getBoardComposeSchema(validation);
	const createlistSchema = getCreateListSchema(validation);
	const updatelistSchema = getUpdateListSchema(validation);

	const workspaceComposeSchema = getWorkspaceComposeSchema(validation);
	const inviteSchema = getInviteSchema(validation);

	return {
		registerSchema,
		loginSchema,
		forgotPasswordSchema,
		resetPasswordSchema,
		boardComposeSchema,
		createlistSchema,
		updatelistSchema,
		workspaceComposeSchema,
		inviteSchema,
	};
};
