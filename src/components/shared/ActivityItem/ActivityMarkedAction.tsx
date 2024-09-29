import { useTranslations } from 'next-intl';

import { useTaskModal } from '@/hooks/useTaskModal';
import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';

export const ActivityMarkedAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { entityType, entityTitle, entityId, task, completed } = activity;

	const openTaskModal = (id?: string) => {
		if (id) {
			onOpen(id);
		}
	};

	const subtaskLabel = task?.subtasks.find(sub => sub._id === entityId);

	const actionEntityType = () => {
		switch (entityType) {
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
						<span className={completed ? 'text-success' : 'text-danger'}>
							&nbsp;&ldquo;{t(completed ? 'activity.completed' : 'activity.incompleted')}&rdquo;
						</span>
					</>
				);

			case EntityType.SUBTASK:
				return (
					<>
						<span className="font-medium">{subtaskLabel ? subtaskLabel?.label : entityTitle}</span>
						{t('activity.on')}
						{task?._id === taskId ? (
							t('activity.on_this_task')
						) : (
							<>
								{t('activity.on_task')}
								<span
									className="font-medium text-primary transition-opacity hover:opacity-80 hover:underline  cursor-pointer"
									onClick={() => openTaskModal(task?._id)}
								>
									{task && task.title}
								</span>
							</>
						)}
						<span className={completed ? 'text-success' : 'text-danger'}>
							&nbsp;&ldquo;{t(completed ? 'activity.completed' : 'activity.incompleted')}&rdquo;
						</span>
					</>
				);

			default:
				return null;
		}
	};

	return (
		<>
			{t('activity.marked')}
			{actionEntityType()}
		</>
	);
};
