'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

import { useMediaQuery } from 'usehooks-ts';

import { Icon } from '@/components/ui/Icon';
import { createButtonConfig } from '@/configs/create-button.config';
import { CreateVariant, useCreateModal } from '@/hooks/useCreateModal';

export const CreateButton: React.FC = () => {
	const t = useTranslations();
	const isMobile = useMediaQuery('(max-width:640px)');
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const modal = useCreateModal();

	const createNew = (variant: CreateVariant) => {
		modal.onOpen(variant);
	};

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
				{createButtonConfig.map(({ variant, label, icon }) => (
					<DropdownItem
						key={variant}
						title={t(label)}
						startContent={<Icon name={icon} />}
						onPress={() => createNew(variant)}
					/>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};
