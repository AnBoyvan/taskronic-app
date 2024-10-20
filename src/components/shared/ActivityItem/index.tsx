import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { UserAvatar } from '@/components/ui/UserAvatar';
import { Locale } from '@/configs/i18n.config';
import { ROUTES } from '@/configs/routes.config';
import { Activity, ActivityAction } from '@/types/activity.type';
import { formatDate } from '@/utils/helpers/formatDate';

import { ActivityAddAction } from './ActivityAddAction';
import { ActivityAdminAction } from './ActivityAdminAction';
import { ActivityArchivedAction } from './ActivityArchivedAction';
import { ActivityBackgroundAction } from './ActivityBackgroundAction';
import { ActivityCloseAction } from './ActivityCloseAction';
import { ActivityDateAction } from './ActivityDateAction';
import { ActivityMarkedAction } from './ActivityMarkedAction';
import { ActivityMovedAction } from './ActivityMoveAction';
import { ActivityPriorityAction } from './ActivityPriorityAction';
import { ActivityRemoveAction } from './ActivityRemoveAction';
import { ActivityRenameAction } from './ActivityRenameAction';

export interface ActivityActionProps {
	activity: Activity;
	taskId?: string;
	userId?: string;
	showBoard?: boolean;
}

export const ActivityItem: React.FC<ActivityActionProps> = ({
	activity,
	taskId,
	userId,
	showBoard,
}) => {
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
				return <ActivityCloseAction activity={activity} />;

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
				avatarName={activity.user.initials || activity.author.initials}
				avatarColor={activity.user.avatar || activity.author.avatar}
			/>
			<div className="flex flex-col">
				<p className="text-wrap text-sm">
					<span className="font-medium">{activity.user.name || activity.author.name}</span>
					{activityActionType()}
				</p>
				<div className="flex flex-col  text-default-500">
					<span className="text-tiny">
						{formatDate(activity.createdAt, t('LocaleSwitcher.current') as Locale, 'full')}
					</span>
					{showBoard && (
						<span className="text-tiny">
							{t('activity.on_board')}
							<Link
								href={`${ROUTES.WORKSPACE}/${activity.board.workspace}/${activity.board._id}`}
								className="transition-opacity hover: hover:opacity-80 underline cursor-pointer break-words"
							>
								{activity.board.title}
							</Link>
						</span>
					)}
				</div>
			</div>
		</div>
	);
};
