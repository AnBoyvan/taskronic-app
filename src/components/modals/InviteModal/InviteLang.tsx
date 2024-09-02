'use client';

import { useTranslations } from 'next-intl';

import { ChangeEvent } from 'react';

import { Select, SelectItem } from '@nextui-org/react';

import { Locale, localesConfig } from '@/configs/i18n.config';

type InviteLangProps = {
	current: Locale;
	setLang: (lang: Locale) => void;
};

export const InviteLang: React.FC<InviteLangProps> = ({ current, setLang }) => {
	const t = useTranslations();

	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const locale = e.target.value as Locale;
		setLang(locale);
	};

	return (
		<Select
			variant="bordered"
			selectedKeys={[current]}
			onChange={onChange}
			label={t('label.invite_lang')}
		>
			{localesConfig.map(({ value, title }) => (
				<SelectItem key={value}>{t(title)}</SelectItem>
			))}
		</Select>
	);
};
