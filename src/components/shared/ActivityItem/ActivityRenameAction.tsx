import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';

export const ActivityRenameAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { entityType, entityTitle, board, task, from } = activity;

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
						{t('activity.onto')}
						<span className="font-medium">{board.title}</span>
					</>
				);

			case EntityType.LIST:
				return (
					<>
						{t('activity.list')}
						{t('activity.from')}
						{from}
						{t('activity.onto')}
						<span className="font-medium">{entityTitle}</span>
					</>
				);

			case EntityType.TASK:
				return (
					<>
						{t(task?._id === taskId ? 'activity.this_task' : 'activity.task')}
						{t('activity.onto')}
						{task?._id === taskId ? (
							<span className="font-medium">{entityTitle}</span>
						) : (
							<span
								className="font-medium text-primary transition-opacity hover:opacity-80 hover:underline  cursor-pointer"
								onClick={() => openTaskModal(task?._id)}
							>
								{entityTitle}
							</span>
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
			{actionEntityType()}
		</>
	);
};
