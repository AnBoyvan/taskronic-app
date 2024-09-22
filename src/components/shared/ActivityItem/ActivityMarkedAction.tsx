import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Space } from '@/components/ui/Space';
import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

export const ActivityMarkedAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { entityType, entityTitle, entityId, task, completed } = activity;

	const openTaskModal = useCallback(
		(id?: string) => {
			if (id) {
				onOpen(id);
			}
		},
		[onOpen],
	);

	const subtaskLabel = task?.subtasks.find(sub => sub._id === entityId);

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.TASK:
				return (
					<>
						{task?._id === taskId ? (
							t('activity.this_task')
						) : (
							<>
								{t('activity.task')}
								<Space />
								<ActivitySpan active onClick={() => openTaskModal(entityId)}>
									{task ? task.title : entityTitle}
								</ActivitySpan>
							</>
						)}
						<Space />
						{t(completed ? 'activity.completed' : 'activity.incompleted')}
						<Space />
					</>
				);

			case EntityType.SUBTASK:
				return (
					<>
						<ActivitySpan medium>{subtaskLabel ? subtaskLabel?.label : entityTitle}</ActivitySpan>
						<Space />
						{t('activity.on')}
						<Space />
						{task?._id === taskId ? (
							t('activity.on_this_task')
						) : (
							<>
								{t('activity.on_task')}
								<Space />
								<ActivitySpan active onClick={() => openTaskModal(entityId)}>
									{task && task.title}
								</ActivitySpan>
							</>
						)}
						<Space />
						<ActivitySpan className={completed ? 'text-success' : 'text-danger'}>
							&ldquo;{t(completed ? 'activity.completed' : 'activity.incompleted')}&rdquo;
						</ActivitySpan>
						<Space />
					</>
				);

			default:
				return null;
		}
	};

	return (
		<>
			{t('activity.marked')}
			<Space />
			{actionEntityType()}
		</>
	);
};
