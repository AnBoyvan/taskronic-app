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

type ThemeSwitcherProps = {
	onSelect?: () => void;
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onSelect }) => {
	const t = useTranslations();

	const { theme, setTheme } = useTheme();

	const onThemeChange = (keys: Selection) => {
		const selected = Array.from(keys).join(', ');
		setTheme(selected);
		if (onSelect) {
			onSelect();
		}
	};

	return (
		<>
			<Popover placement="left-start" offset={18} triggerType="menu">
				<PopoverTrigger>{t('theme.label')}</PopoverTrigger>
				<PopoverContent>
					<Listbox
						aria-label={t('theme.label')}
						disallowEmptySelection
						selectionMode="single"
						selectedKeys={[theme ? theme : '']}
						onSelectionChange={onThemeChange}
					>
						<ListboxItem key="light">{t('theme.light')}</ListboxItem>
						<ListboxItem key="dark">{t('theme.dark')}</ListboxItem>
						<ListboxItem key="system">{t('theme.system')}</ListboxItem>
					</Listbox>
				</PopoverContent>
			</Popover>
		</>
	);
};
