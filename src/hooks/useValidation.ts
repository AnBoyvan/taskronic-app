import { useMessages } from 'next-intl';

import { getChangePasswordSchema } from '@/utils/validation/auth/getChangePasswordSchema';
import { getForgotPasswordSchema } from '@/utils/validation/auth/getForgotPassword';
import { getLoginSchema } from '@/utils/validation/auth/getLoginSchema';
import { getRegisterSchema } from '@/utils/validation/auth/getRegisterSchema';
import { getResetPasswordSchema } from '@/utils/validation/auth/getResetPasswordSchema';
import { getBoardComposeSchema } from '@/utils/validation/board/getBoardComposeSchema';
import { getCreateListSchema } from '@/utils/validation/board/getCreateListSchema';
import { getUpdateListSchema } from '@/utils/validation/board/getUpdateListSchema';
import { getTaskCreateSchema } from '@/utils/validation/task/getTaskCreateSchema';
import { getUpdateProfileSchema } from '@/utils/validation/user/getUpdateProfileSchema';
import { getInviteSchema } from '@/utils/validation/workspace/getInviteSchema';
import { getWorkspaceComposeSchema } from '@/utils/validation/workspace/getWorkspaceComposeSchema';

export const useValidation = () => {
	const { validation } = useMessages() as IntlMessages;

	const registerSchema = getRegisterSchema(validation);
	const loginSchema = getLoginSchema(validation);
	const forgotPasswordSchema = getForgotPasswordSchema(validation);
	const resetPasswordSchema = getResetPasswordSchema(validation);
	const changePasswordSchema = getChangePasswordSchema(validation);

	const workspaceComposeSchema = getWorkspaceComposeSchema(validation);
	const inviteSchema = getInviteSchema(validation);

	const boardComposeSchema = getBoardComposeSchema(validation);
	const createlistSchema = getCreateListSchema(validation);
	const updatelistSchema = getUpdateListSchema(validation);

	const taskCreateSchema = getTaskCreateSchema(validation);

	const updateProfileSchema = getUpdateProfileSchema(validation);

	return {
		registerSchema,
		loginSchema,
		forgotPasswordSchema,
		resetPasswordSchema,
		changePasswordSchema,
		workspaceComposeSchema,
		inviteSchema,
		boardComposeSchema,
		createlistSchema,
		updatelistSchema,
		taskCreateSchema,
		updateProfileSchema,
	};
};
