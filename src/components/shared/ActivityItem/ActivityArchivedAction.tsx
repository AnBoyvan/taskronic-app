import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';

export const ActivityArchivedAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { entityType, entityTitle, entityId, board, task, completed } = activity;

	const openTaskModal = useCallback(
		(id?: string) => {
			if (id) {
				onOpen(id);
			}
		},
		[onOpen],
	);

	const archivedList = board.lists.find(list => list._id === entityId);

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.LIST:
				return (
					<>
						{t('activity.list')}
						<span className="font-medium">{archivedList ? archivedList.label : entityTitle}</span>
					</>
				);

			case EntityType.TASK:
				return (
					<>
						{task?._id === taskId ? (
							t('activity.this_task')
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
					</>
				);

			default:
				return null;
		}
	};

	return (
		<>
			{t(completed ? 'activity.archived' : 'activity.restored')}
			{actionEntityType()}
		</>
	);
};
