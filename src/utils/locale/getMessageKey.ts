import { AbstractIntlMessages } from 'next-intl';

export const getMessageKey = (msg: string, messages: AbstractIntlMessages): string | null => {
	for (const key in messages) {
		if (typeof messages[key] === 'object') {
			const result = getMessageKey(msg, messages[key]);
			if (result) {
				return `${key}.${result}`;
			}
		} else if (messages[key] === msg) {
			return key;
		}
	}
	return null;
};
