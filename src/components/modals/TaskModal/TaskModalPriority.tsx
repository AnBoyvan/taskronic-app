'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { PrioritySwitcher } from '@/components/shared/PrioritySwitcher';
import { useTasksEdit } from '@/hooks/useTasksEdit';
import { Priority } from '@/types/root.interface';

type TaskModalPriorityProps = {
	taskId: string;
	priority: Priority;
	canEdit?: boolean;
};

export const TaskModalPriority: React.FC<TaskModalPriorityProps> = ({
	taskId,
	priority,
	canEdit,
}) => {
	const t = useTranslations();
	const { updGeneral } = useTasksEdit();

	const [taskPriority, setTaskPriority] = useState<Priority>(priority);

	const changePriority = (newPriority: Priority) => {
		if (newPriority === taskPriority) {
			return;
		}
		updGeneral.mutate({
			taskId,
			data: {
				priority: newPriority,
			},
		});
		setTaskPriority(newPriority);
	};

	return (
		<div className="flex flex-col gap-1">
			<span className="text-tiny">{t('common.priority')}:</span>
			<PrioritySwitcher
				current={taskPriority}
				onPriorityChange={changePriority}
				className="min-w-40 w-40"
				isDisabled={!canEdit}
			/>
		</div>
	);
};
