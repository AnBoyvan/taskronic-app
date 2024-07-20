'use client';

import { useLocale, useTranslations } from 'next-intl';

import { ChangeEvent, useTransition } from 'react';

import { Select, SelectItem } from '@nextui-org/react';

import { Locale } from '@/configs/i18n.config';
import { setUserLocale } from '@/utils/locale/userLocale';

export const LocaleSwitcher: React.FC = () => {
	const [isPending, startTransition] = useTransition();

	const t = useTranslations('LocaleSwitcher');
	const locale = useLocale();
	const items = [
		{
			value: 'en',
			label: t('en'),
		},
		{
			value: 'uk',
			label: t('uk'),
		},
	];

	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const locale = e.target.value as Locale;
		startTransition(() => {
			setUserLocale(locale);
		});
	};

	return (
		<Select
			className="max-w-20"
			aria-label="language"
			selectedKeys={[locale]}
			disabled={isPending}
			onChange={onChange}
		>
			{items.map(i => (
				<SelectItem key={i.value}>{i.label}</SelectItem>
			))}
		</Select>
	);
};
