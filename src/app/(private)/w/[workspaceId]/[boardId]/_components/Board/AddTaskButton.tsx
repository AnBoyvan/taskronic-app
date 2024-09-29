'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';

import { AddTaskForm } from './AddTaskForm';

type AddTaskButtonProps = {
	boardId: string;
	listId: string;
	textColor: string;
	isEditing: boolean;
	setEditing: (value: boolean) => void;
};

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({
	boardId,
	listId,
	textColor,
	isEditing,
	setEditing,
}) => {
	const t = useTranslations();

	return (
		<div className="shrink-0 px-2 pt-2 w-full select-none">
			{isEditing ? (
				<AddTaskForm
					boardId={boardId}
					listId={listId}
					isOpen={isEditing}
					onClose={() => setEditing(false)}
				/>
			) : (
				<Button
					size="lg"
					variant="light"
					radius="sm"
					color="primary"
					className={` text-sm justify-start p-2 h-8 ${textColor}`}
					startContent={<Icon name="Plus" size={16} />}
					fullWidth
					onPress={() => setEditing(true)}
				>
					{t('task.add')}
				</Button>
			)}
		</div>
	);
};
