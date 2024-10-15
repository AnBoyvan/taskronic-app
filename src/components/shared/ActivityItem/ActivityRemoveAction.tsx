import { useTranslations } from 'next-intl';

import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';

export const ActivityRemoveAction: React.FC<ActivityActionProps> = ({
	activity,
	taskId,
	userId,
}) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();

	const { entityType, entityTitle, entityId, task } = activity;

	const openTaskModal = (id?: string) => {
		if (id) {
			onOpen(id);
		}
	};

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.TASK:
				return (
					<>
						{t('activity.task')}
						<span className="font-medium">{task ? task.title : entityTitle}</span>
					</>
				);

			case EntityType.LIST:
				return (
					<>
						{t('activity.list')}
						<span className="font-medium">{entityTitle}</span>
					</>
				);

			case EntityType.USER:
				return (
					<>
						{entityId !== userId && (
							<>
								<span className="font-medium">{entityTitle}</span>
								{t('activity.from')}
							</>
						)}
						{Boolean(task) ? (
							task?._id === taskId ? (
								t(entityId === userId ? 'activity.this_task' : 'activity.from_this_task')
							) : (
								<span
									className="font-medium text-primary transition-opacity hover:opacity-80 hover:underline  cursor-pointer"
									onClick={() => openTaskModal(task?._id)}
								>
									{task && task.title}
								</span>
							)
						) : (
							<>{t('activity.from_board')}</>
						)}
					</>
				);

			default:
				return null;
		}
	};

	return (
		<>
			{t(entityId === userId ? 'activity.left' : 'activity.removed')}
			{actionEntityType()}
		</>
	);
};
