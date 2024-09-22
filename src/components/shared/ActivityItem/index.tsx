import { useTranslations } from 'next-intl';

import { Space } from '@/components/ui/Space';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Locale } from '@/configs/i18n.config';
import { Activity, ActivityAction } from '@/types/activity.type';
import { formatDate } from '@/utils/helpers/formatDate';

import { ActivityAddAction } from './ActivityAddAction';
import { ActivityAdminAction } from './ActivityAdminAction';
import { ActivityArchivedAction } from './ActivityArchivedAction';
import { ActivityBackgroundAction } from './ActivityBackgroundAction';
import { ActivityDateAction } from './ActivityDateAction';
import { ActivityMarkedAction } from './ActivityMarkedAction';
import { ActivityMovedAction } from './ActivityMoveAction';
import { ActivityPriorityAction } from './ActivityPriorityAction';
import { ActivityRemoveAction } from './ActivityRemoveAction';
import { ActivityRenameAction } from './ActivityRenameAction';
import { ActivitySpan } from './ActivitySpan';

export interface ActivityActionProps {
	activity: Activity;
	taskId?: string;
	userId?: string;
}

export const ActivityItem: React.FC<ActivityActionProps> = ({ activity, taskId, userId }) => {
	const t = useTranslations();

	const activityActionType = () => {
		switch (activity.action) {
			case ActivityAction.ADD:
				return <ActivityAddAction activity={activity} taskId={taskId} userId={userId} />;

			case ActivityAction.RENAME:
				return <ActivityRenameAction activity={activity} taskId={taskId} />;

			case ActivityAction.BACKGROUND:
				return <ActivityBackgroundAction activity={activity} />;

			case ActivityAction.ADMIN:
				return <ActivityAdminAction activity={activity} />;

			case ActivityAction.MOVE:
				return <ActivityMovedAction activity={activity} taskId={taskId} />;

			case ActivityAction.MARK:
				return <ActivityMarkedAction activity={activity} taskId={taskId} />;

			case ActivityAction.CLOSE:
				return <ActivityMarkedAction activity={activity} />;

			case ActivityAction.ARCHIVE:
				return <ActivityArchivedAction activity={activity} taskId={taskId} />;

			case ActivityAction.REMOVE:
				return <ActivityRemoveAction activity={activity} taskId={taskId} userId={userId} />;

			case ActivityAction.DATE:
				return <ActivityDateAction activity={activity} taskId={taskId} />;

			case ActivityAction.PRIORITY:
				return <ActivityPriorityAction activity={activity} taskId={taskId} />;

			default:
				return null;
		}
	};

	return (
		<div className="flex flex-row items-start gap-2 py-2">
			<UserAvatar
				size="sm"
				avatarName={activity.user.avatarName || activity.author.avatarName}
				avatarColor={activity.user.avatarColor || activity.author.avatarColor}
			/>
			<div className="flex flex-col">
				<div className="inline-flex flex-wrap text-sm">
					<ActivitySpan>
						<ActivitySpan medium>{activity.user.name || activity.author.name}</ActivitySpan>
						<Space />
						{activityActionType()}
					</ActivitySpan>
				</div>
				<div className="text-tiny">
					{formatDate(activity.createdAt, t('LocaleSwitcher.current') as Locale, 'full')}
				</div>
			</div>
		</div>
	);
};
