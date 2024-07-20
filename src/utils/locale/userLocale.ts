'use server';

import { cookies } from 'next/headers';

import { defaultLocale, Locale, LOCALE_COOKIE_NAME, locales } from '@/configs/i18n.config';

import { getBrowserLocale } from './getBrowserLocale';

export async function getUserLocale() {
	const currentLocale = cookies().get(LOCALE_COOKIE_NAME)?.value;

	if (currentLocale !== undefined) {
		return currentLocale;
	}

	const browserLocale = getBrowserLocale();

	if (locales.includes(browserLocale as Locale)) {
		return browserLocale;
	}

	return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
	cookies().set(LOCALE_COOKIE_NAME, locale);
}
