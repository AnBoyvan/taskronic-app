import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Space } from '@/components/ui/Space';
import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

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
								<Space />
								<ActivitySpan active onClick={() => openTaskModal(entityId)}>
									{task ? task.title : entityTitle}
								</ActivitySpan>
							</>
						)}
						<Space />
						{t('activity.from')}
						<Space />
						{listFrom?.label}
						<Space />
						{t('activity.to')}
						<Space />
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
			<Space />
			{actionEntityType()}
		</>
	);
};
