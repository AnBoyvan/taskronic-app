'use client';

import { useTranslations } from 'next-intl';

import { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { BoardsFilter } from '@/components/shared/BoardsFilter';
import { DueDateFilter } from '@/components/shared/DueDateFilter';
import { PriorityFilter } from '@/components/shared/PriorityFilter';
import { WorkspacesFilter } from '@/components/shared/WorkspacesFilter';
import { Icon } from '@/components/ui/Icon';
import { Board } from '@/types/board.interface';
import { WorkspaceBasic } from '@/types/workspace.interface';
import { TasksFilter } from '@/utils/helpers/filterTasks';

type UserTasksFilterProps = {
	boards: Board[];
	workspaces: WorkspaceBasic[];
	filter: TasksFilter;
	setFilter: Dispatch<SetStateAction<TasksFilter>>;
};

export const UserTasksFilter: React.FC<UserTasksFilterProps> = ({
	boards,
	workspaces,
	filter,
	setFilter,
}) => {
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const changeFilter = (field: keyof TasksFilter, value: any) => {
		setFilter({
			...filter,
			[field]: value,
		});
	};

	return (
		<>
			<Button
				size="md"
				radius="sm"
				variant="faded"
				color="default"
				startContent={<Icon name="Filter" size={16} />}
				onPress={() => setIsOpen(true)}
			>
				{t('task.filter')}
			</Button>
			<Modal
				size="xs"
				radius="md"
				scrollBehavior="inside"
				isOpen={isOpen}
				onOpenChange={open => setIsOpen(open)}
				placement="center"
				backdrop="blur"
				classNames={{
					closeButton: 'right-2 top-3',
				}}
				closeButton={
					<Button isIconOnly variant="light" size="md" radius="sm">
						<Icon name="X" size={20} />
					</Button>
				}
			>
				<ModalContent className="flex-col justify-start h-full p-3">
					<ModalHeader className="p-2 justify-center text-base">{t('task.filter')}</ModalHeader>
					<ModalBody className="p-0 pb-10 gap-8 mt-2">
						<Input
							variant="bordered"
							size="md"
							radius="sm"
							placeholder={t('common.search')}
							startContent={<Icon name="Search" size={16} />}
							type="search"
							value={filter.search}
							onValueChange={value => changeFilter('search', value)}
						/>
						<PriorityFilter
							value={filter.priority}
							setValue={newValue => changeFilter('priority', newValue)}
						/>
						<DueDateFilter
							value={filter.dueStatuses}
							setValue={newValue => changeFilter('dueStatuses', newValue)}
						/>
						<BoardsFilter
							value={filter.boards}
							setValue={newValue => changeFilter('boards', newValue)}
							boards={boards}
						/>
						<WorkspacesFilter
							value={filter.workspaces}
							setValue={newValue => changeFilter('workspaces', newValue)}
							workspaces={workspaces}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
