import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Space } from '@/components/ui/Space';
import { priorityColors } from '@/constants/priority-colors';
import { useTaskModal } from '@/hooks/useTaskModal';
import { Priority } from '@/types/root.interface';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

export const ActivityPriorityAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { task, entityId, entityTitle, to } = activity;

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
			<Space />
			{t('activity.priority')}
			<Space />
			{task?._id === taskId ? (
				t('activity.of_this_task')
			) : (
				<>
					{t('activity.of_task')}
					<Space />
					<ActivitySpan active onClick={() => openTaskModal(entityId)}>
						{task ? task.title : entityTitle}
					</ActivitySpan>
				</>
			)}
			<Space />
			{t('activity.onto')}
			<Space />
			<ActivitySpan className={`${priorityColors[Number(to) as Priority]} rounded-md p-0.5`}>
				&ldquo;{t(`priority.${Number(to) as Priority}`)}&rdquo;
			</ActivitySpan>
		</>
	);
};
