import { getTranslations } from 'next-intl/server';

import { getMessageKey } from '@/utils/locale/getMessageKey';

import en from '../../../messages/en.json';

export const errorCatch = async (error: any): Promise<string> => {
	const t = await getTranslations();

	const errMessage = error?.response?.data?.message;

	const message = errMessage
		? typeof error.response.data.message === 'object'
			? errMessage[0]
			: errMessage
		: error.message;

	const messageKey = getMessageKey(message, en);

	return messageKey ? t(messageKey as any) : message;
};
