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

type LanguageSwitcherProps = {
	onAction?: () => void;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onAction }) => {
	const t = useTranslations();

	const onLocaleChange = (keys: Selection) => {
		const selected = Array.from(keys).join(', ');
		setUserLocale(selected as Locale);

		if (onAction) {
			onAction();
		}
	};

	return (
		<>
			<Popover placement="left-start" offset={18} triggerType="menu">
				<PopoverTrigger>{t('locale.label')}</PopoverTrigger>
				<PopoverContent>
					<Listbox
						aria-label={t('locale.label')}
						disallowEmptySelection
						selectionMode="single"
						selectedKeys={[t('locale.current')]}
						onSelectionChange={onLocaleChange}
					>
						<ListboxItem key="uk">{t('locale.uk_full')}</ListboxItem>
						<ListboxItem key="en">{t('locale.en_full')}</ListboxItem>
					</Listbox>
				</PopoverContent>
			</Popover>
		</>
	);
};
