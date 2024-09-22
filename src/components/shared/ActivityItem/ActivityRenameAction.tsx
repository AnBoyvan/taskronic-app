import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Space } from '@/components/ui/Space';
import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

export const ActivityRenameAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { entityType, entityTitle, entityId, board, task, from } = activity;

	const openTaskModal = useCallback(
		(id?: string) => {
			if (id) {
				onOpen(id);
			}
		},
		[onOpen],
	);

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.BOARD:
				return (
					<>
						{t('activity.board')}
						<Space />
						{t('activity.onto')}
						<ActivitySpan medium>{board.title}</ActivitySpan>
					</>
				);

			case EntityType.LIST:
				return (
					<>
						{t('activity.list')}
						<Space />
						{t('activity.from')}
						<Space />
						{from}
						<Space />
						{t('activity.onto')}
						<ActivitySpan medium>{entityTitle}</ActivitySpan>
					</>
				);

			case EntityType.TASK:
				return (
					<>
						{t(task?._id === taskId ? 'activity.this_task' : 'activity.task')}
						<Space />
						{t('activity.onto')}
						<Space />
						{task?._id === taskId ? (
							<ActivitySpan medium>{entityTitle}</ActivitySpan>
						) : (
							<ActivitySpan active onClick={() => openTaskModal(entityId)}>
								{entityTitle}
							</ActivitySpan>
						)}
					</>
				);

			default:
				return null;
		}
	};

	return (
		<>
			{t('activity.renamed')}
			<Space />
			{actionEntityType()}
		</>
	);
};
