import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';

export const ActivityMovedAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();

	const { entityType, entityTitle, entityId, board, task, from, to } = activity;

	const openTaskModal = useCallback(
		(id?: string) => {
			if (id) {
				onOpen(id);
			}
		},
		[onOpen],
	);

	const listFrom = board.lists.find(list => list._id === from);
	const listTo = board.lists.find(list => list._id === to);

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.TASK:
				return (
					<>
						{taskId === entityId ? (
							<>{t('activity.this_task')}</>
						) : (
							<>
								{t('activity.task')}
								<span
									className="font-medium text-primary transition-opacity hover:opacity-80 hover:underline  cursor-pointer"
									onClick={() => openTaskModal(task?._id)}
								>
									{task ? task.title : entityTitle}
								</span>
							</>
						)}
						{t('activity.from')}
						{listFrom?.label}
						{t('activity.to')}
						{listTo?.label}
					</>
				);

			default:
				return null;
		}
	};

	return (
		<>
			{t('activity.moved')}
			{actionEntityType()}
		</>
	);
};
