import { useTranslations } from 'next-intl';

import { Space } from '@/components/ui/Space';

import { ActivityActionProps } from '.';
import { ActivitySpan } from './ActivitySpan';

export const ActivityAdminAction: React.FC<ActivityActionProps> = ({ activity }) => {
	const t = useTranslations();
	const { entityTitle, completed } = activity;

	return (
		<>
			{t('activity.made')}
			<Space />
			<ActivitySpan medium>{entityTitle}</ActivitySpan>
			<Space />
			{t(completed ? 'activity.admin' : 'activity.normal')}
			<Space />
			{t('activity.of_board')}
		</>
	);
};
