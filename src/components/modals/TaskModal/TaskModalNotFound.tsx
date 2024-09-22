'use client';

import { useTranslations } from 'next-intl';

import { Icon } from '@/components/ui/Icon';

type TaskModalNotFoundProps = {
	error?: string;
};

export const TaskModalNotFound: React.FC<TaskModalNotFoundProps> = ({ error }) => {
	const t = useTranslations();

	return (
		<div className="flex flex-col gap-4 items-center justify-center text-danger w-full h-[50vh]">
			<span>{error ? error : t('task.task_not_found')}</span>
			<Icon name="Frown" size={48} />
		</div>
	);
};
