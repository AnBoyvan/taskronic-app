import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import {
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Selection,
} from '@nextui-org/react';

export const ThemeSwitcher: React.FC = () => {
	const t = useTranslations();

	const { theme, setTheme } = useTheme();

	const onThemeChange = (keys: Selection) => {
		const selected = Array.from(keys).join(', ');
		setTheme(selected);
	};

	return (
		<>
			<Popover placement="left-start" offset={25} triggerType="menu">
				<PopoverTrigger>{t('account.theme')}</PopoverTrigger>
				<PopoverContent>
					<Listbox
						aria-label={t('account.theme')}
						disallowEmptySelection
						selectionMode="single"
						selectedKeys={[theme ? theme : '']}
						onSelectionChange={onThemeChange}
					>
						<ListboxItem key="light">{t('account.light')}</ListboxItem>
						<ListboxItem key="dark">{t('account.dark')}</ListboxItem>
						<ListboxItem key="system">{t('account.system')}</ListboxItem>
					</Listbox>
				</PopoverContent>
			</Popover>
		</>
	);
};
