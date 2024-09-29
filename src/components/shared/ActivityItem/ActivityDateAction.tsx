import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Locale } from '@/configs/i18n.config';
import { useTaskModal } from '@/hooks/useTaskModal';
import { formatDate } from '@/utils/helpers/formatDate';

import { ActivityActionProps } from '.';

export const ActivityDateAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { entityTitle, task, completed, from, to } = activity;

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
			{!completed ? (
				<>{t(from ? 'activity.changed' : 'activity.set')}</>
			) : (
				<>{t('activity.removed')}</>
			)}
			{t('activity.due')}
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
			{from && (
				<>
					{t('activity.from')}
					{formatDate(from, t('LocaleSwitcher.current') as Locale, 'short')}
				</>
			)}
			{to && (
				<>
					{t('activity.onto')}
					{formatDate(to, t('LocaleSwitcher.current') as Locale, 'short')}
				</>
			)}
		</>
	);
};
