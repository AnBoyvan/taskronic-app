'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';

import { AddListForm } from './AddListForm';

type AddListPopoverProps = {
	boardId: string;
};

export const AddListPopover: React.FC<AddListPopoverProps> = ({ boardId }) => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Popover
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			classNames={{
				content: 'p-0 w-64',
			}}
			placement="bottom"
		>
			<PopoverTrigger>
				<Button
					variant="solid"
					color="primary"
					size="sm"
					startContent={<Icon name="Plus" size={16} />}
					className="text-sm"
				>
					{t('common.list')}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<AddListForm boardId={boardId} isOpen={isOpen} onClose={() => setIsOpen(false)} showTitle />
			</PopoverContent>
		</Popover>
	);
};
