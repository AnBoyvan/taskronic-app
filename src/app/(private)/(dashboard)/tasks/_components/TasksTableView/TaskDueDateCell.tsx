import { useLocale } from 'next-intl';

import { Chip } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { Locale } from '@/configs/i18n.config';
import { formatDate } from '@/utils/helpers/formatDate';
import { getTaskDueStatus } from '@/utils/helpers/getTaskDueStatus';

type TaskDueDateCellProps = {
	dueDate: string | null;
	completed: boolean;
};

export const TaskDueDateCell: React.FC<TaskDueDateCellProps> = ({ dueDate, completed }) => {
	const locale = useLocale() as Locale;

	const dueStatus = getTaskDueStatus(dueDate, completed);

	return (
		<>
			{dueDate && (
				<Chip
					variant="solid"
					color={dueStatus.color}
					size="sm"
					radius="sm"
					className="p-0 h-7 w-full text-[10px]"
				>
					<div className="w-full flex flex-row gap-1 items-center">
						<Icon name={dueStatus.icon} size={12} />
						<span>{formatDate(dueDate, locale, 'short')}</span>
					</div>
				</Chip>
			)}
		</>
	);
};
