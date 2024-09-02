export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export const locales = ['en', 'uk'] as const;

export const defaultLocale: Locale = 'en';

export const localesConfig: { value: Locale; label: TranslationKeys; title: TranslationKeys }[] = [
	{
		value: 'en',
		label: 'LocaleSwitcher.en',
		title: 'LocaleSwitcher.en_full',
	},
	{
		value: 'uk',
		label: 'LocaleSwitcher.uk',
		title: 'LocaleSwitcher.uk_full',
	},
];
