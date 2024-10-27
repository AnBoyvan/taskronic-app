import { enUS, uk } from 'date-fns/locale';

export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export const locales = ['en', 'uk'] as const;

export const defaultLocale: Locale = 'en';

export const fnsLocale = {
	en: enUS,
	uk: uk,
};

export const localesConfig: { value: Locale; label: TranslationKeys; title: TranslationKeys }[] = [
	{
		value: 'en',
		label: 'locale.en',
		title: 'locale.en_full',
	},
	{
		value: 'uk',
		label: 'locale.uk',
		title: 'locale.uk_full',
	},
];
