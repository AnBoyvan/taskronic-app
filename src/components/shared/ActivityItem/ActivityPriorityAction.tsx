import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { priorityColors } from '@/constants/priority-colors';
import { useTaskModal } from '@/hooks/useTaskModal';
import { Priority } from '@/types/root.interface';

import { ActivityActionProps } from '.';

export const ActivityPriorityAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { task, entityTitle, to } = activity;

	const openTaskModal = useCallback(
		(id?: string) => {
			if (id) {
				onOpen(id);
			}
		},
		[onOpen],
	);

	return (
		<>
			{t('activity.changed')}
			{t('activity.priority')}
			{task?._id === taskId ? (
				t('activity.of_this_task')
			) : (
				<>
					{t('activity.of_task')}
					<span
						className="font-medium text-primary transition-opacity hover:opacity-80 hover:underline  cursor-pointer"
						onClick={() => openTaskModal(task?._id)}
					>
						{task ? task.title : entityTitle}
					</span>
				</>
			)}
			{t('activity.onto')}
			<span
				className={`${priorityColors[Number(to) as Priority]} leading-none rounded-md p-1 pt-0.5 `}
			>
				&ldquo;{t(`priority.${Number(to) as Priority}`)}&rdquo;
			</span>
		</>
	);
};
