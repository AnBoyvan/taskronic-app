'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

import { useMediaQuery } from 'usehooks-ts';

import { Icon } from '@/components/ui/Icon';

export const CreateButton: React.FC = () => {
	const t = useTranslations();
	const isMobile = useMediaQuery('(max-width:640px)');
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	});

	if (!isMounted) return null;

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button
					startContent={<Icon name="Plus" size={20} className="sm:hidden" />}
					isIconOnly={isMobile}
					color="primary"
					variant="solid"
					size="sm"
				>
					<span className="hidden sm:block">{t('common.create')}</span>
				</Button>
			</DropdownTrigger>

			<DropdownMenu aria-label={t('common.create')}>
				<DropdownItem key="1">1</DropdownItem>
				<DropdownItem key="2">2</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
