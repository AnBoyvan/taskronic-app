import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from './utils/locale/userLocale';

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		messages: {
			...(await import(`../messages/${locale}/about.json`)).default,
			...(await import(`../messages/${locale}/actions.json`)).default,
			...(await import(`../messages/${locale}/activity.json`)).default,
			...(await import(`../messages/${locale}/api.json`)).default,
			...(await import(`../messages/${locale}/auth.json`)).default,
			...(await import(`../messages/${locale}/board.json`)).default,
			...(await import(`../messages/${locale}/common.json`)).default,
			...(await import(`../messages/${locale}/general.json`)).default,
			...(await import(`../messages/${locale}/locale.json`)).default,
			...(await import(`../messages/${locale}/priority.json`)).default,
			...(await import(`../messages/${locale}/privacy.json`)).default,
			...(await import(`../messages/${locale}/task.json`)).default,
			...(await import(`../messages/${locale}/terms.json`)).default,
			...(await import(`../messages/${locale}/theme.json`)).default,
			...(await import(`../messages/${locale}/user.json`)).default,
			...(await import(`../messages/${locale}/validation.json`)).default,
			...(await import(`../messages/${locale}/workspace.json`)).default,
		},
	};
});
