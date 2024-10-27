'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { useState } from 'react';

import { Button, Progress } from '@nextui-org/react';

import { SubtaskForm } from '@/components/shared/SubtaskForm';
import { Icon } from '@/components/ui/Icon';
import { useSubtaskEdit } from '@/hooks/useSubtaskEdit';
import { BoardPermissions } from '@/types/board.interface';
import { Subtask, Task } from '@/types/tasks.interface';

import { TaskModalSection } from './TaskModalSection';
import { TaskModalSubtaskItem } from './TaskModalSubtaskItem';

type TaskModalSubtasksProps = {
	task: Task;
	permissions?: BoardPermissions;
};

export const TaskModalSubtasks: React.FC<TaskModalSubtasksProps> = ({ task, permissions }) => {
	const t = useTranslations();
	const { addSubtask, updSubtask, delSubtask } = useSubtaskEdit();

	const [hideChecked, setHideChecked] = useState<boolean>(false);
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks);

	const handleAddSubtask = async (label: string) => {
		setIsFormOpen(false);
		const updated = await addSubtask.mutateAsync({ taskId: task._id, data: { label } });
		setSubtasks(updated.subtasks);
	};

	const handleSubtaskEdit = async (data: Subtask) => {
		const current = subtasks.find(sub => sub._id === data._id);

		if (!current) {
			return;
		}

		updSubtask.mutate({ taskId: task._id, data });

		setSubtasks(prev => prev.map(sub => (sub._id === data._id ? data : sub)));
	};

	const handleSubtaskRemove = async (id: string) => {
		const current = subtasks.find(sub => sub._id === id);

		if (!current) {
			return;
		}

		delSubtask.mutate({ taskId: task._id, data: current });

		setSubtasks(subtasks.filter(sub => sub._id !== id));
	};

	const completedSubtasksCount = subtasks.filter(sub => sub.completed).length;
	const totalSubtasksCount = subtasks.length;
	const completionPercentage =
		totalSubtasksCount > 0 ? (completedSubtasksCount / totalSubtasksCount) * 100 : 0;

	const filtered = subtasks.filter(sub => (hideChecked ? !sub.completed : true));

	return (
		<TaskModalSection
			icon="ListChecks"
			title={t('common.subtask')}
			button={t(hideChecked ? 'task.subtask_show' : 'task.subtask_hide')}
			action={() => setHideChecked(!hideChecked)}
		>
			{filtered.length > 0 && (
				<Progress
					showValueLabel
					aria-label="Loading..."
					value={completionPercentage}
					className="mt-2"
					classNames={{
						base: 'flex-row items-center h-6',
						track: 'w-full',
						value: 'text-sm',
					}}
				/>
			)}
			<ul className="mt-2">
				{subtasks.map(sub => (
					<TaskModalSubtaskItem
						key={sub._id}
						subtask={sub}
						canEdit={permissions?.createTask}
						onEdit={handleSubtaskEdit}
						onRemove={handleSubtaskRemove}
					/>
				))}
			</ul>
			{isFormOpen ? (
				<SubtaskForm onAccept={handleAddSubtask} onReject={() => setIsFormOpen(false)} />
			) : (
				<Button
					size="sm"
					variant="solid"
					radius="sm"
					color="default"
					className={clsx('w-fit mt-2', !permissions?.createTask && 'hidden')}
					startContent={<Icon name="Plus" size={16} />}
					onPress={() => setIsFormOpen(true)}
				>
					{t('actions.add')}
				</Button>
			)}
		</TaskModalSection>
	);
};
