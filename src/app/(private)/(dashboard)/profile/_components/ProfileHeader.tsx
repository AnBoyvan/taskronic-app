'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { Divider, Tab, Tabs, User } from '@nextui-org/react';

import { profileNav } from '@/configs/nav.config';
import { colorVariants } from '@/constants/color-variants.constants';
import { useUser } from '@/hooks/useUser';

export const ProfileHeader: React.FC = () => {
	const t = useTranslations();
	const pathname = usePathname();

	const { name, email, avatar, initials } = useUser();

	return (
		<div className="flex flex-col items-start">
			<User
				name={name}
				description={email}
				avatarProps={{
					size: 'lg',
					name: initials,
					classNames: {
						base: clsx('h-12 w-12', colorVariants[avatar]),
					},
				}}
				classNames={{
					name: 'text-xl',
				}}
			/>
			<Tabs selectedKey={pathname} className="mt-4 lg:mt-8" variant="underlined" color="primary">
				{profileNav.map(({ value, label }) => (
					<Tab key={value} href={value} title={t(label)} className="py-2" />
				))}
			</Tabs>
			<Divider className="-mt-1.5" />
		</div>
	);
};
