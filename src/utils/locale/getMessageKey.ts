import { AbstractIntlMessages } from 'next-intl';

type GetMessageKey = {
	(msg: string, messages: AbstractIntlMessages): string | null;
};

export const getMessageKey: GetMessageKey = (msg, messages) => {
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
