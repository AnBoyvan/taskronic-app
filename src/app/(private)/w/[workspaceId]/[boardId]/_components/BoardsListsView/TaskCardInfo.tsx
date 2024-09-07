'use client';

import { useLocale, useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { Locale } from '@/configs/i18n.config';
import { useTasksEdit } from '@/hooks/useTasksEdit';
import { Task, TaskBoardField } from '@/types/tasks.interface';
import { formatDate } from '@/utils/helpers/formatDate';

type TaskCardInfoProps = {
	task: Task | TaskBoardField;
	canClose?: boolean;
};

export const TaskCardInfo: React.FC<TaskCardInfoProps> = ({ task, canClose }) => {
	const t = useTranslations();
	const locale = useLocale() as Locale;
	const { complete } = useTasksEdit();

	const { dueDate, completed, description, subtasks, comments } = task;

	const isExpired = dueDate && Date.now() > new Date(dueDate).getTime();

	const comletedSwitcher = () => {
		if (!canClose || complete.isPending) {
			return;
		}
		complete.mutate(task._id);
	};

	const completedSubtasks = subtasks.filter(sub => sub.completed);

	return (
		<div className="flex flex-row gap-3 px-2 items-center h-6">
			{dueDate && (
				<Button
					className={clsx(
						'flex flex-row items-center p-1 h-full group text-[10px] gap-1 rounded-[4px] cursor-pointer leading-3 border-none bg-transparent',
						isExpired && !completed && 'bg-danger text-danger-foreground',
						completed && 'bg-success text-success-foreground',
					)}
					onClick={comletedSwitcher}
				>
					<Icon name="CalendarClock" size={12} className="group-hover:hidden" />
					<Icon
						name={completed ? 'SquareCheckBig' : 'Square'}
						size={12}
						className="hidden group-hover:block"
					/>
					<span>{formatDate(dueDate, locale, 'short')}</span>
				</Button>
			)}
			{description && <Icon name="FileText" size={16} />}
			{comments && comments.length > 0 && (
				<div className="flex flex-row items-center gap-0.5 text-[10px]">
					<Icon name="MessageSquareText" size={16} />
					<span>{comments.length}</span>
				</div>
			)}
			{subtasks && subtasks.length > 0 && (
				<div className="flex flex-row items-center gap-0.5 text-[10px]">
					<Icon name="SquareCheckBig" size={16} />
					<span>
						{completedSubtasks.length}/{subtasks.length}
					</span>
				</div>
			)}
		</div>
	);
};
