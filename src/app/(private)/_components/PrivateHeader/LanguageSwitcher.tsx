import { useTranslations } from 'next-intl';

import {
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Selection,
} from '@nextui-org/react';

import { Locale } from '@/configs/i18n.config';
import { setUserLocale } from '@/utils/locale/userLocale';

export const LanguageSwitcher: React.FC = () => {
	const t = useTranslations();

	const onLocaleChange = (keys: Selection) => {
		const selected = Array.from(keys).join(', ');
		setUserLocale(selected as Locale);
	};

	return (
		<>
			<Popover placement="left-start" offset={25} triggerType="menu">
				<PopoverTrigger>{t('LocaleSwitcher.label')}</PopoverTrigger>
				<PopoverContent>
					<Listbox
						aria-label={t('LocaleSwitcher.label')}
						disallowEmptySelection
						selectionMode="single"
						selectedKeys={[t('LocaleSwitcher.current')]}
						onSelectionChange={onLocaleChange}
					>
						<ListboxItem key="uk">{t('LocaleSwitcher.uk_full')}</ListboxItem>
						<ListboxItem key="en">{t('LocaleSwitcher.en_full')}</ListboxItem>
					</Listbox>
				</PopoverContent>
			</Popover>
		</>
	);
};
