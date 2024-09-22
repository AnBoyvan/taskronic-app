import { useTranslations } from 'next-intl';

import { Space } from '@/components/ui/Space';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

export const ActivityRemoveAction: React.FC<ActivityActionProps> = ({
	activity,
	taskId,
	userId,
}) => {
	const t = useTranslations();
	const { entityType, entityTitle, entityId, task } = activity;

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.TASK:
				return (
					<>
						{t('activity.task')}
						<Space />
						<ActivitySpan medium>{task ? task.title : entityTitle}</ActivitySpan>
					</>
				);

			case EntityType.USER:
				return (
					<>
						{entityId !== userId && (
							<>
								<ActivitySpan medium>{entityTitle}</ActivitySpan>
								<Space />
								{t('activity.from')}
								<Space />
							</>
						)}
						{Boolean(task) ? (
							task?._id === taskId ? (
								t(entityId === userId ? 'activity.this_task' : 'activity.from_this_task')
							) : (
								<ActivitySpan medium>{task?.title}</ActivitySpan>
							)
						) : (
							t('activity.board')
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
			<Space />
			{actionEntityType()}
		</>
	);
};
