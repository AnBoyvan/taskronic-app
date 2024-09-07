'use client';

import { useTranslations } from 'next-intl';

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
import { List } from '@/types/board.interface';

import { BoardLists } from '../BoardLists';
import { ListColors } from './ListColors';
import { ListMoveOptions } from './ListMoveOptions';

type ListOptionsProps = {
	list: List;
	boardId: string;
	boardLists: List[];
	onTaskAdd: () => void;
	onTasksMove: (sourceList: string, destList: string) => void;
	onListMove: (sourceIndex: number, destIndex: number) => void;
};

export const ListOptions: React.FC<ListOptionsProps> = ({
	list,
	boardId,
	boardLists,
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

	return (
		<Popover placement="bottom" offset={0} isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
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
					className="absolute top-2 right-2 z-10"
				>
					<Icon name="X" size={16} />
				</Button>
				<Listbox aria-labelledby={t('board.list_actions')} className="p-2 w-64">
					<ListboxSection showDivider className="p-0">
						<ListboxItem
							key={t('task.add')}
							title={t('task.add')}
							onPress={() => {
								onTaskAdd();
								setIsOpen(false);
							}}
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
							<BoardLists
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
