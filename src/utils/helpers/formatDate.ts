import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { enUS, uk } from 'date-fns/locale';

import { Locale } from '@/configs/i18n.config';

type FormatDate = {
	(date: string, lang: Locale, variant: 'short' | 'full' | 'date' | string): string;
};

const locales = {
	en: enUS,
	uk: uk,
};

const variants = {
	short: 'dd MMM yyyy, HH:mm',
	full: 'dd MMMM yyyy, HH:mm',
	date: 'dd MMMM yyyy',
};

export const formatDate: FormatDate = (date, lang, variant) => {
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const zonedDate = toZonedTime(new Date(date), userTimeZone);

	const locale = locales[lang];

	const dateFormat = variants[variant as keyof typeof variants] || variant;

	const dateSting = format(zonedDate, dateFormat, { locale });

	return dateSting;
};
