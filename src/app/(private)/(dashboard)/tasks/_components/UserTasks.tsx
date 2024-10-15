'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Select, SelectItem, SharedSelection } from '@nextui-org/react';

import { TasksGridView } from '@/app/(private)/(dashboard)/tasks/_components/TasksGridView';
import { TasksTableView } from '@/app/(private)/(dashboard)/tasks/_components/TasksTableView';
import { Task } from '@/types/tasks.interface';
import { defaultTaskFilter, filterTasks, TasksFilter } from '@/utils/helpers/filterTasks';
import { getBoardsAndWorkpaces } from '@/utils/helpers/getBoardsAndWorkpaces';

import { UserTasksFilter } from './UserTasksFilter';

type UserTasksProps = {
	tasks: Task[];
};

export const UserTasks: React.FC<UserTasksProps> = ({ tasks }) => {
	const t = useTranslations();

	const [userTasks, setUserTasks] = useState<Task[]>(tasks);
	const [sortBy, setSortBy] = useState<'board' | 'due'>('board');
	const [filter, setFilter] = useState<TasksFilter>(defaultTaskFilter);

	const changeSorting = (keys: SharedSelection) => {
		const selected = Array.from(keys).join(', ');
		if (selected === 'board' || selected === 'due') {
			setSortBy(selected);
		}
	};

	const { boards, workspaces } = getBoardsAndWorkpaces(tasks);

	useEffect(() => {
		const filtered = filterTasks(tasks, filter);
		setUserTasks(filtered);
	}, [filter, tasks]);

	return (
		<div className="flex flex-col h-full w-full overflow-auto lg:overflow-hidden">
			<div className="flex flex-row self-center justify-center items-center gap-4 flex-wrap">
				<Select
					aria-label={t('label.sort')}
					disallowEmptySelection
					selectionMode="single"
					variant="faded"
					size="md"
					fullWidth={false}
					classNames={{
						base: 'flex lg:hidden w-fit',
						innerWrapper: 'w-fit pr-7',
					}}
					popoverProps={{
						className: 'w-fit',
					}}
					selectedKeys={[sortBy]}
					onSelectionChange={key => changeSorting(key)}
				>
					<SelectItem key="board" aria-label={t('sort.by_board')} className="w-fit">
						{t('sort.by_board')}
					</SelectItem>
					<SelectItem key="due" aria-label={t('sort.by_due')} className="w-fit">
						{t('sort.by_due')}
					</SelectItem>
				</Select>
				<UserTasksFilter
					boards={boards}
					workspaces={workspaces}
					filter={filter}
					setFilter={setFilter}
				/>
				<Button size="md" variant="faded" onPress={() => setFilter(defaultTaskFilter)}>
					{t('common.clear_filter')}
				</Button>
			</div>
			<TasksGridView tasks={userTasks} boards={boards} sortBy={sortBy} />
			<TasksTableView tasks={userTasks} />
		</div>
	);
};
