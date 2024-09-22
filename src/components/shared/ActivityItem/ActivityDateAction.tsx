import { useTranslations } from 'next-intl';

import { useCallback } from 'react';

import { Space } from '@/components/ui/Space';
import { Locale } from '@/configs/i18n.config';
import { useTaskModal } from '@/hooks/useTaskModal';
import { formatDate } from '@/utils/helpers/formatDate';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

export const ActivityDateAction: React.FC<ActivityActionProps> = ({ activity, taskId }) => {
	const t = useTranslations();
	const { onOpen } = useTaskModal();
	const { entityTitle, entityId, task, completed, from, to } = activity;

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
			<Space />
			{t('activity.due')}
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
			{from && (
				<>
					<Space />
					{t('activity.from')}
					<Space />
					{formatDate(from, t('LocaleSwitcher.current') as Locale, 'short')}
				</>
			)}
			{to && (
				<>
					<Space />
					{t('activity.onto')}
					<Space />
					{formatDate(to, t('LocaleSwitcher.current') as Locale, 'short')}
				</>
			)}
		</>
	);
};
