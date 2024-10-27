'use client';

import { useLocale, useTranslations } from 'next-intl';

import { ChangeEvent } from 'react';

import { Select, SelectItem } from '@nextui-org/react';

import { Locale, localesConfig } from '@/configs/i18n.config';
import { setUserLocale } from '@/utils/locale/userLocale';

export const LocaleSwitcher: React.FC = () => {
	const t = useTranslations();
	const locale = useLocale();

	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const locale = e.target.value as Locale;
		setUserLocale(locale);
	};

	return (
		<Select
			className="w-[72px]"
			color="primary"
			variant="faded"
			radius="sm"
			aria-label="language"
			selectedKeys={[locale]}
			onChange={onChange}
			classNames={{
				popoverContent: 'rounded-lg',
			}}
		>
			{localesConfig.map(({ value, label }) => (
				<SelectItem key={value}>{t(label)}</SelectItem>
			))}
		</Select>
	);
};
