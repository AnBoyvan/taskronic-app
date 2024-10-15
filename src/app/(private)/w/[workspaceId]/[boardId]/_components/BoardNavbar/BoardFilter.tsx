'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { DueDateFilter } from '@/components/shared/DueDateFilter';
import { MembersFilter } from '@/components/shared/MembersFilter';
import { PriorityFilter } from '@/components/shared/PriorityFilter';
import { Icon } from '@/components/ui/Icon';
import { useBoardState } from '@/hooks/useBoardState';
import { Board } from '@/types/board.interface';
import { defaultBoardFilter, TasksFilter } from '@/utils/helpers/filterTasks';
import { isFiltered } from '@/utils/helpers/isFiltered';

type BoardFilterProps = {
	board: Board;
};

export const BoardFilter: React.FC<BoardFilterProps> = ({ board }) => {
	const t = useTranslations();
	const { filter, changeFilter, resetFilter } = useBoardState(board._id);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [boardFilter, setBoardFilter] = useState<TasksFilter>(defaultBoardFilter);

	useEffect(() => {
		setBoardFilter(filter);
	}, [filter]);

	const isFilterSet = isFiltered(boardFilter);

	return (
		<>
			<div className="flex flex-row">
				<Button
					size="sm"
					variant="solid"
					color="default"
					startContent={<Icon name="Filter" size={16} />}
					onPress={() => setIsOpen(true)}
					className={clsx(
						'hidden md:flex bg-default-100 text-sm',
						isFilterSet && 'rounded-r-none text-primary',
					)}
				>
					{t('common.filter')}
				</Button>
				<Button
					size="sm"
					variant="solid"
					color="default"
					isIconOnly
					startContent={<Icon name="Filter" size={16} />}
					onPress={() => setIsOpen(true)}
					className={clsx(
						'flex md:hidden bg-default-100',
						isFilterSet && 'rounded-r-none text-primary',
					)}
				/>
				{isFilterSet && (
					<Button
						size="sm"
						variant="solid"
						color="danger"
						isIconOnly
						startContent={<Icon name="FilterX" size={16} />}
						onPress={resetFilter}
						className="rounded-l-none"
					/>
				)}
			</div>
			<Modal
				size="xs"
				scrollBehavior="inside"
				isOpen={isOpen}
				onOpenChange={open => setIsOpen(open)}
				placement="center"
				backdrop="blur"
				classNames={{
					closeButton: 'right-2 top-3',
				}}
				closeButton={
					<Button isIconOnly variant="light" size="md">
						<Icon name="X" size={20} />
					</Button>
				}
			>
				<ModalContent className="flex-col justify-start h-full p-3">
					<ModalHeader className="p-2 justify-center text-base">{t('task.filter')}</ModalHeader>
					<ModalBody className="p-0 pb-10 gap-8 mt-2">
						<Input
							variant="flat"
							size="md"
							placeholder={t('placeholder.search')}
							startContent={<Icon name="Search" size={16} />}
							type="search"
							value={filter.search}
							onValueChange={value => changeFilter('search', value)}
						/>
						<PriorityFilter
							value={boardFilter.priority}
							setValue={newValue => changeFilter('priority', newValue)}
						/>
						<DueDateFilter
							value={boardFilter.dueStatuses}
							setValue={newValue => changeFilter('dueStatuses', newValue)}
						/>
						<MembersFilter
							members={board.members}
							value={boardFilter.members}
							setValue={newValue => changeFilter('members', newValue)}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
