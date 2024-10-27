'use client';

import { useTranslations } from 'next-intl';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { createButtonConfig } from '@/configs/create-button.config';
import { CreateVariant, useCreateModal } from '@/hooks/useCreateModal';

export const CreateButton: React.FC = () => {
	const t = useTranslations();

	const modal = useCreateModal();

	const createNew = (variant: CreateVariant) => {
		modal.onOpen(variant);
	};

	return (
		<Dropdown radius="md">
			<DropdownTrigger>
				<Button
					color="primary"
					variant="solid"
					size="sm"
					className="flex flex-row gap-2 min-w-8 md:min-w-16 p-0 md:px-3"
				>
					<Icon name="Plus" size={20} className="flex md:hidden" />
					<span className="hidden md:flex">{t('actions.create')}</span>
				</Button>
			</DropdownTrigger>

			<DropdownMenu aria-label={t('actions.create')}>
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
