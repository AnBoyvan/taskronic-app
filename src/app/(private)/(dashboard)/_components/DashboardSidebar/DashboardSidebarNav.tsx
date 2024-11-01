import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

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
					// startContent={<Icon name={icon} size={16} />}
					isReadOnly={Boolean(pathname === value)}
					classNames={{
						base: clsx('p-0', pathname === value && 'text-primary bg-primary-50'),
						// title: 'font-medium w-full p-0',
					}}
				>
					<Link href={value} className="w-full flex flex-row items-center font-medium gap-1 p-2">
						<Icon name={icon} size={16} />
						<span>{t(label)}</span>
					</Link>
				</ListboxItem>
			))}
		</Listbox>
	);
};
