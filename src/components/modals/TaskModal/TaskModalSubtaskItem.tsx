'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Checkbox, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { useSubtaskEdit } from '@/hooks/useSubtaskEdit';
import { Subtask } from '@/types/tasks.interface';

import { SubtaskFormForm } from '../../shared/SubtaskForm';

type TaskModalSubtaskItemProps = {
	subtask: Subtask;
	canEdit?: boolean;
	onEdit: (subtask: Subtask) => void;
	onRemove: (id: string) => void;
};

export const TaskModalSubtaskItem: React.FC<TaskModalSubtaskItemProps> = ({
	subtask,
	canEdit,
	onEdit,
	onRemove,
}) => {
	const t = useTranslations();
	const {} = useSubtaskEdit();

	const [checked, setChecked] = useState<boolean>(subtask.completed);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const checkedToggle = (isSelected: boolean) => {
		onEdit({
			...subtask,
			completed: isSelected,
		});
		setChecked(isSelected);
	};

	const handleEdit = (label: string) => {
		onEdit({
			...subtask,
			label,
		});
		setIsEditing(false);
	};

	const handleRemove = () => {
		onRemove(subtask._id);
	};

	return (
		<li className="flex flex-row flex-start">
			<Checkbox
				isSelected={checked}
				isDisabled={!canEdit}
				size="md"
				onValueChange={checkedToggle}
			/>
			{isEditing ? (
				<SubtaskFormForm
					label={subtask.label}
					isEditing
					onAccept={handleEdit}
					onReject={() => setIsEditing(false)}
					actions={
						<Popover placement="bottom" offset={0} isTriggerDisabled={!canEdit}>
							<PopoverTrigger>
								<Button
									isIconOnly
									radius="full"
									size="sm"
									variant="light"
									color="danger"
									className="ml-auto"
								>
									<Icon name="Trash2" size={16} />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="p-2">
								<Button variant="solid" color="danger" onPress={handleRemove}>
									{t('common.remove')}
								</Button>
							</PopoverContent>
						</Popover>
					}
				/>
			) : (
				<Button
					variant="light"
					size="md"
					onPress={() => setIsEditing(true)}
					fullWidth
					className="p-2 justify-start text-start text-wrap min-h-8 h-fit"
				>
					{subtask.label}
				</Button>
			)}
		</li>
	);
};
