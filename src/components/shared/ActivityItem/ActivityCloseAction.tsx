import { useTranslations } from 'next-intl';

import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';

export const ActivityCloseAction: React.FC<ActivityActionProps> = ({ activity }) => {
	const t = useTranslations();
	const { entityType, completed } = activity;

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.BOARD:
				return <>{t('activity.board')}</>;

			default:
				return null;
		}
	};

	return (
		<>
			{t(completed ? 'activity.closed' : 'activity.opened')}
			{actionEntityType()}
		</>
	);
};
