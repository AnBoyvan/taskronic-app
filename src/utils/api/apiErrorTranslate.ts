import { getTranslations } from 'next-intl/server';

import { messages } from '@/configs/messages.config';
import { getMessageKey } from '@/utils/locale/getMessageKey';

export const apiErrorTranslate = async (error: any): Promise<string> => {
	const t = await getTranslations();

	const errMessage = error?.response?.data?.message;

	const message = errMessage
		? typeof error.response.data.message === 'object'
			? errMessage[0]
			: errMessage
		: error.message;

	const messageKey = getMessageKey(message, messages);

	return messageKey ? t(messageKey as any) : message;
};
