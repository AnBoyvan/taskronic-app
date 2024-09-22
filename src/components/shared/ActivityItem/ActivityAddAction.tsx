import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Space } from '@/components/ui/Space';
import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

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
						{t('activity.board')} <ActivitySpan medium>{board.title}</ActivitySpan>
					</>
				);

			case EntityType.LIST:
				return (
					<>
						{t('activity.list')}
						<Space />
						<ActivitySpan medium>{newList ? newList.label : entityTitle}</ActivitySpan>
						<Space />
						{t('activity.to')} {t('activity.this_board')}
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
						<Space />
						{t('activity.to_list')}
						<Space />
						{to}
					</>
				);

			case EntityType.USER:
				return (
					<>
						{entityId !== userId && (
							<>
								<ActivitySpan medium>{entityTitle}</ActivitySpan>
								<Space />
							</>
						)}
						{t('activity.to')}
						<Space />
						{Boolean(task) ? (
							task?._id === taskId ? (
								t('activity.to_this_task')
							) : (
								<ActivitySpan active onClick={() => openTaskModal(task?._id)}>
									{task?.title}
								</ActivitySpan>
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
			<Space />
			{actionEntityType()}
		</>
	);
};
