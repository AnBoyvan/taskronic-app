import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';

export const ActivityAddAction: React.FC<ActivityActionProps> = ({ activity, taskId, userId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { entityType, entityTitle, entityId, board, task, to } = activity;

	const openTaskModal = useCallback(
		(id?: string) => {
			if (id) {
				onOpen(id);
			}
		},
		[onOpen],
	);

	const newList = board.lists.find(list => list._id === entityTitle);

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.BOARD:
				return (
					<>
						{t('activity.board')}
						<span className="font-medium">{board.title}</span>
					</>
				);

			case EntityType.LIST:
				return (
					<>
						{t('activity.list')}
						<span className="font-medium">{newList ? newList.label : entityTitle}</span>
						{t('activity.to')}
						{t('activity.this_board')}
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
						{t('activity.to_list')}
						<span className="font-medium">{to}</span>
					</>
				);

			case EntityType.USER:
				return (
					<>
						{entityId !== userId && (
							<>
								<span className="font-medium">{entityTitle}</span>
							</>
						)}
						{t('activity.to')}
						{Boolean(task) ? (
							task?._id === taskId ? (
								t('activity.to_this_task')
							) : (
								<>
									<span
										className="font-medium text-primary transition-opacity hover:opacity-80 hover:underline  cursor-pointer"
										onClick={() => openTaskModal(task?._id)}
									>
										{task?.title}
									</span>
								</>
							)
						) : (
							t('activity.this_board')
						)}
					</>
				);

			default:
				return null;
		}
	};

	return (
		<>
			{t(entityId === userId ? 'activity.join' : 'activity.added')}
			{actionEntityType()}
		</>
	);
};
