import { useTranslations } from 'next-intl';

import { EntityType } from '@/types/activity.type';

import { ActivityActionProps } from '.';

export const ActivityBackgroundAction: React.FC<ActivityActionProps> = ({ activity }) => {
	const t = useTranslations();
	const { entityType } = activity;

	const actionEntityType = () => {
		switch (entityType) {
			case EntityType.BOARD:
				return <>{t('activity.of_board')}</>;

			default:
				return null;
		}
	};

	return (
		<>
			{t('activity.changed')}
			{t('activity.bg')}
			{actionEntityType()}
		</>
	);
};
