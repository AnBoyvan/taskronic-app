import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Space } from '@/components/ui/Space';
import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

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
						<Space />
						<ActivitySpan medium>{archivedList ? archivedList.label : entityTitle}</ActivitySpan>
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
								<Space />
								<ActivitySpan active onClick={() => openTaskModal(entityId)}>
									{task ? task.title : entityTitle}
								</ActivitySpan>
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
			<Space />
			{actionEntityType()}
		</>
	);
};
