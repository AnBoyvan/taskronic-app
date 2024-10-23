'use client';

import { useLocale } from 'next-intl';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addMonths, format, getDay, parse, startOfWeek, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { uk } from 'date-fns/locale/uk';

import { Locale } from '@/configs/i18n.config';
import { priorityConfig } from '@/configs/priority-config';
import '@/styles/calendar.css';
import { Task } from '@/types/tasks.interface';
import { getTaskDueStatus } from '@/utils/helpers/getTaskDueStatus';

import { ScheduleEventCard } from './ScheduleEventCard';
import { ScheduleToolbar } from './ScheduleToolbar';

type ScheduleProps = {
	tasks: Task[];
};

const locales = {
	en: enUS,
	uk: uk,
};

export const Schedule: React.FC<ScheduleProps> = ({ tasks }) => {
	const locale = useLocale();

	const [value, setValue] = useState<Date>(
		tasks.length > 0 ? new Date(tasks[0].dueDate!) : new Date(),
	);

	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek: () => startOfWeek(new Date(), { locale: locales[locale as Locale] }),
		getDay,
		locales,
	});

	const events = tasks.map(task => ({
		start: new Date(task.dueDate!),
		end: new Date(task.dueDate!),
		status: getTaskDueStatus(task.dueDate, task.completed),
		title: task.title,
		priority: priorityConfig.find(({ value }) => value === task.priority),
		id: task._id,
	}));

	const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
		if (action === 'PREV') {
			setValue(subMonths(value, 1));
		} else if (action === 'NEXT') {
			setValue(addMonths(value, 1));
		} else if (action === 'TODAY') {
			setValue(new Date());
		}
	};

	const toolbarLabel =
		(localizer?.format(value, 'LLLL yyy', locale) || 'Місяць').charAt(0).toUpperCase() +
		(localizer?.format(value, 'LLLL yyy', locale) || 'Місяць').slice(1);

	return (
		<Calendar
			localizer={localizer}
			date={value}
			events={events}
			views={['month']}
			defaultView="month"
			toolbar
			showAllEvents
			culture={locale === 'uk' ? 'uk' : undefined}
			max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
			formats={{
				monthHeaderFormat: (date, culture, localizer) =>
					(localizer?.format(date, 'LLLL yyy', culture) || 'Місяць').charAt(0).toUpperCase() +
					(localizer?.format(date, 'LLLL yyy', culture) || 'Місяць').slice(1),
				weekdayFormat: (date, culture, localizer) => localizer?.format(date, 'EEE', culture) ?? '',
			}}
			components={{
				toolbar: () => <ScheduleToolbar date={toolbarLabel} onNavigate={handleNavigate} />,
				eventWrapper: ({ event }) => (
					<ScheduleEventCard
						id={event.id}
						title={event.title}
						priority={event.priority}
						status={event.status}
					/>
				),
			}}
		/>
	);
};
