'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { List } from '@/types/board.interface';

import { AddTaskForm } from './AddTaskForm';

type AddTaskPopoverProps = {
	boardId: string;
	lists: List[];
};

export const AddTaskPopover: React.FC<AddTaskPopoverProps> = ({ boardId, lists }) => {
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
			radius="md"
		>
			<PopoverTrigger>
				<Button
					variant="solid"
					color="primary"
					size="sm"
					startContent={<Icon name="Plus" size={16} />}
					className="text-sm"
				>
					{t('common.task')}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<AddTaskForm
					boardId={boardId}
					lists={lists}
					onClose={() => setIsOpen(false)}
					isOpen={isOpen}
					showTitle
				/>
			</PopoverContent>
		</Popover>
	);
};
