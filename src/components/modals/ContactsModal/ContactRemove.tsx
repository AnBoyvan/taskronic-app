'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { useContacts } from '@/hooks/useContacts';

type ContactRemoveProps = {
	contactId: string;
};

export const ContactRemove: React.FC<ContactRemoveProps> = ({ contactId }) => {
	const t = useTranslations();
	const { remove } = useContacts();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (remove.isSuccess || remove.isSuccess) {
			setIsOpen(false);
		}
	}, [remove.isSuccess]);

	return (
		<Popover placement="bottom" isOpen={isOpen} onOpenChange={open => setIsOpen(open)} offset={0}>
			<PopoverTrigger>
				<Button size="sm" variant="light" color="danger" isIconOnly>
					<Icon name="Trash2" size={16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="gap-2 p-2">
				<p>{t('account.remove_contact')}</p>
				<div className="flex flex-row gap-2">
					<Button
						variant="bordered"
						onClick={() => setIsOpen(false)}
						isDisabled={remove.isPending}
						spinnerPlacement="end"
						isLoading={remove.isPending}
					>
						{t('common.no')}
					</Button>
					<Button
						variant="solid"
						color="danger"
						onClick={() => {
							remove.mutate(contactId);
							setIsOpen(false);
						}}
						isDisabled={remove.isPending}
						spinnerPlacement="end"
						isLoading={remove.isPending}
					>
						{t('common.yes')}
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
