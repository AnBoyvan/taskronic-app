'use client';

import { useTranslations } from 'next-intl';

import { Activity as ActivityType } from '@/types/activity.type';

type ActivityProps = {
	activity?: ActivityType;
};

export const Activity: React.FC<ActivityProps> = ({ activity }) => {
	const t = useTranslations();

	return <div className="flex flex-row"></div>;
};
