import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { Listbox, ListboxItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { dashboardNav } from '@/configs/nav.config';

export const DashboardSidebarNav = () => {
	const t = useTranslations();
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Listbox
			aria-label={t('nav.navigation')}
			color="primary"
			classNames={{
				base: 'px-0',
			}}
		>
			{dashboardNav.map(({ value, label, icon }) => (
				<ListboxItem
					key={value}
					onPress={() => {
						router.push(value);
					}}
					aria-label={value}
					startContent={<Icon name={icon} size={16} />}
					isReadOnly={Boolean(pathname === value)}
					classNames={{
						base: pathname === value ? 'text-primary bg-primary-50' : '',
						title: 'font-medium',
					}}
				>
					{t(label)}
				</ListboxItem>
			))}
		</Listbox>
	);
};
