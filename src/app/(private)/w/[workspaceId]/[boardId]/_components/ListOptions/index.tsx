'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { useState } from 'react';

import {
	Button,
	Listbox,
	ListboxItem,
	ListboxSection,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { useLists } from '@/hooks/useLists';
import { BoardPermissions, List } from '@/types/board.interface';

import { ListColors } from './ListColors';
import { ListMoveOptions } from './ListMoveOptions';
import { Lists } from './Lists';

type ListOptionsProps = {
	list: List;
	boardId: string;
	boardLists: List[];
	permissions: BoardPermissions;
	addTaskOption?: boolean;
	onTaskAdd?: () => void;
	onTasksMove: (sourceList: string, destList: string) => void;
	onListMove: (sourceIndex: number, destIndex: number) => void;
};

export const ListOptions: React.FC<ListOptionsProps> = ({
	list,
	boardId,
	boardLists,
	permissions,
	addTaskOption,
	onTaskAdd,
	onTasksMove,
	onListMove,
}) => {
	const t = useTranslations();
	const { updList } = useLists();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const archiveList = () => {
		updList.mutate({
			boardId,
			data: {
				...list,
				archived: true,
			},
		});
		setIsOpen(false);
	};

	const disabled = () => {
		let keys: string[] = [];

		if (!permissions.lists) {
			keys = [...keys, t('board.list_move'), t('board.list_color'), t('board.list_archive')];
		}

		if (!permissions.createTask) {
			keys = [...keys, t('task.add')];
		}

		if (!permissions.taskOrder) {
			keys = [...keys, t('board.list_move_tasks')];
		}

		return keys;
	};

	return (
		<Popover
			placement="bottom"
			offset={0}
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			radius="md"
		>
			<PopoverTrigger>
				<Button variant="light" size="sm" className={`${list.textColor}`} isIconOnly>
					<Icon name="Ellipsis" size={16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 relative">
				<p className="font-medium text-center pt-3">{t('board.list_actions')}</p>
				<Button
					isIconOnly
					variant="light"
					size="sm"
					onPress={() => setIsOpen(false)}
					className="absolute top-2 right-2"
				>
					<Icon name="X" size={16} />
				</Button>
				<Listbox
					aria-labelledby={t('board.list_actions')}
					className="p-2 w-64"
					disabledKeys={disabled()}
				>
					<ListboxSection showDivider className="p-0">
						<ListboxItem
							key={t('task.add')}
							title={t('task.add')}
							onPress={() => {
								if (onTaskAdd) {
									onTaskAdd();
								}
								setIsOpen(false);
							}}
							className={clsx(addTaskOption ? '' : 'hidden')}
						/>
						<ListboxItem key={t('board.list_move')} textValue={t('board.list_move')}>
							<ListMoveOptions
								current={list}
								lists={boardLists}
								onListMove={(sourceIndex, destIndex) => {
									onListMove(sourceIndex, destIndex);
									setIsOpen(false);
								}}
							/>
						</ListboxItem>
						<ListboxItem key={t('board.list_move_tasks')} textValue={t('board.list_move_tasks')}>
							<Lists
								current={list._id}
								lists={boardLists}
								onListSelect={listId => {
									setIsOpen(false);
									onTasksMove(list._id, listId);
								}}
								trigger={t('board.list_move_tasks')}
							/>
						</ListboxItem>
						<ListboxItem key={t('board.list_color')} textValue={t('board.list_color')}>
							<ListColors list={list} boardId={boardId} />
						</ListboxItem>
					</ListboxSection>
					<ListboxSection className="p-0 mb-0">
						<ListboxItem
							key={t('board.list_archive')}
							title={t('board.list_archive')}
							onPress={() => {
								archiveList();
								setIsOpen(false);
							}}
						/>
					</ListboxSection>
				</Listbox>
			</PopoverContent>
		</Popover>
	);
};
