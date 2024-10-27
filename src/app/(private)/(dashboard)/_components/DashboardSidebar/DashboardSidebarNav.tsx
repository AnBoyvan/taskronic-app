import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Listbox, ListboxItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { dashboardNav } from '@/configs/nav.config';

export const DashboardSidebarNav = () => {
	const t = useTranslations();
	const pathname = usePathname();

	return (
		<Listbox
			aria-label={t('common.navigation')}
			color="primary"
			classNames={{
				base: 'px-0',
			}}
		>
			{dashboardNav.map(({ value, label, icon }) => (
				<ListboxItem
					key={value}
					aria-label={value}
					startContent={<Icon name={icon} size={16} />}
					isReadOnly={Boolean(pathname === value)}
					classNames={{
						base: pathname === value ? 'text-primary bg-primary-50' : '',
						title: 'font-medium',
					}}
				>
					<Link href={value}>{t(label)}</Link>
				</ListboxItem>
			))}
		</Listbox>
	);
};
