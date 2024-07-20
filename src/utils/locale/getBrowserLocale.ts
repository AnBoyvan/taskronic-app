import Negotiator from 'negotiator';
import { headers } from 'next/headers';

import { match } from '@formatjs/intl-localematcher';

import { defaultLocale, Locale, locales } from '@/configs/i18n.config';

export function getBrowserLocale(): Locale {
	const negotiatorHeaders = {
		'accept-language': headers().get('accept-language') || 'en-US,en;q=0.5',
	};

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	const locale = match(languages, locales, defaultLocale) as Locale;

	return locale;
}
