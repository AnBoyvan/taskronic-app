'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { parseAbsoluteToLocal, ZonedDateTime } from '@internationalized/date';
import {
	Button,
	Checkbox,
	DateInput,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@nextui-org/react';

import { CustomDayPicker } from '@/components/ui/CustomDayPicker';
import { Icon } from '@/components/ui/Icon';
import { Locale } from '@/configs/i18n.config';
import { useTasksEdit } from '@/hooks/useTasksEdit';
import { formatDate } from '@/utils/helpers/formatDate';

type TaskModalDueDateProps = {
	taskId: string;
	dueDate: string | null;
	completed: boolean;
	canEdit?: boolean;
	canClose?: boolean;
};

export const TaskModalDueDate: React.FC<TaskModalDueDateProps> = ({
	taskId,
	dueDate,
	completed,
	canEdit,
	canClose,
}) => {
	const t = useTranslations();
	const { updGeneral, resetDueDate, complete } = useTasksEdit();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [taskDueDate, setTaskDueDate] = useState<Date | undefined>(undefined);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [isCompleted, setIsCompleted] = useState<boolean>(completed);
	const [color, setColor] = useState<'default' | 'success' | 'danger'>('default');

	const completeToggle = () => {
		if (complete.isPending) {
			return;
		}
		setIsCompleted(!isCompleted);
		complete.mutate(taskId);
	};

	const handleDateChange = (selected: Date | undefined) => {
		if (!selected) {
			return;
		}

		const currentHours = selectedDate.getHours();
		const currentMinutes = selectedDate.getMinutes();
		const currentSeconds = selectedDate.getSeconds();

		const updatedDate = new Date(
			selected.getFullYear(),
			selected.getMonth(),
			selected.getDate(),
			currentHours,
			currentMinutes,
			currentSeconds,
		);

		setSelectedDate(updatedDate);
	};

	const setDueDate = () => {
		updGeneral.mutate({
			taskId,
			data: {
				dueDate: selectedDate.toISOString(),
			},
		});
		setTaskDueDate(selectedDate);
		setIsOpen(false);
	};

	const removeDueDate = () => {
		resetDueDate.mutate(taskId);
		setIsOpen(false);
		setTaskDueDate(undefined);
	};

	useEffect(() => {
		if (dueDate && !taskDueDate) {
			setTaskDueDate(new Date(dueDate));
			setSelectedDate(new Date(dueDate));
		}
	}, []);

	useEffect(() => {
		const isExpired = taskDueDate && new Date(taskDueDate).getTime() < Date.now();

		if (isExpired && !isCompleted) {
			setColor('danger');
		} else if (isCompleted) {
			setColor('success');
		} else {
			setColor('default');
		}
	}, [taskDueDate, isCompleted]);

	return (
		<>
			{Boolean(canEdit || taskDueDate) && (
				<div className="flex flex-col gap-1">
					<span className="text-tiny">{t('task.due_date')}:</span>
					<div className="flex flex-row">
						{dueDate && (
							<Checkbox
								isSelected={isCompleted}
								onChange={completeToggle}
								isDisabled={!canClose || complete.isPending}
							/>
						)}
						<Popover
							placement="top"
							shouldFlip={false}
							isOpen={isOpen}
							onOpenChange={open => setIsOpen(open)}
						>
							<PopoverTrigger>
								<Button
									isDisabled={!canEdit}
									color={color}
									endContent={taskDueDate ? <Icon name="CalendarClock" size={16} /> : undefined}
									className="data-[disabled=true]:opacity-100"
								>
									{taskDueDate
										? formatDate(
												taskDueDate.toISOString(),
												t('LocaleSwitcher.current') as Locale,
												'full',
											)
										: t('common.add')}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="p-2">
								<p className="font-medium text-center pt-1">{t('task.due_date')}</p>
								<Button
									isIconOnly
									variant="light"
									size="sm"
									onPress={() => setIsOpen(false)}
									className="absolute top-2 right-2"
								>
									<Icon name="X" size={16} />
								</Button>
								<CustomDayPicker
									required={false}
									mode="single"
									selected={selectedDate}
									onSelect={selected => handleDateChange(selected)}
								/>
								<DateInput
									aria-label={t('task.due_date')}
									variant="bordered"
									hideTimeZone
									value={selectedDate ? parseAbsoluteToLocal(selectedDate?.toISOString()) : null}
									onChange={(value: ZonedDateTime) =>
										setSelectedDate(new Date(value.toAbsoluteString()))
									}
								/>
								<Button
									fullWidth
									color="primary"
									variant="solid"
									className="mt-2"
									onPress={setDueDate}
									isDisabled={updGeneral.isPending || resetDueDate.isPending}
								>
									{t('common.accept')}
								</Button>
								<Button
									fullWidth
									color="default"
									variant="solid"
									className="mt-2"
									onPress={removeDueDate}
									isDisabled={updGeneral.isPending || resetDueDate.isPending}
								>
									{t('common.remove')}
								</Button>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			)}
		</>
	);
};
