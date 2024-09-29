import { useTranslations } from 'next-intl';

import { ActivityActionProps } from '.';

export const ActivityAdminAction: React.FC<ActivityActionProps> = ({ activity }) => {
	const t = useTranslations();
	const { entityTitle, completed } = activity;

	return (
		<>
			{t('activity.made')}
			<span className="font-medium">{entityTitle}</span>
			{t(completed ? 'activity.admin' : 'activity.normal')}
			{t('activity.of_board')}
		</>
	);
};
