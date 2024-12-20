'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useLists } from '@/hooks/useLists';
import { List } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

type BoardMenuArchivedListsProps = {
	boardId: string;
	lists: List[];
	canEdit: boolean;
	tasks: Task[];
	search: string;
	canDeleteTasks: boolean;
};

export const BoardMenuArchivedLists: React.FC<BoardMenuArchivedListsProps> = ({
	boardId,
	lists,
	canEdit,
	tasks,
	search,
	canDeleteTasks,
}) => {
	const t = useTranslations();
	const { updList, deleteList } = useLists();
	const [archivedLists, setArchivedLists] = useState<List[]>(lists);

	const restoreList = (list: List) => {
		updList.mutate({
			boardId,
			data: {
				...list,
				archived: false,
			},
		});
		setArchivedLists(archivedLists.filter(({ _id }) => _id !== list._id));
	};

	const removeList = (list: List) => {
		deleteList.mutate({
			boardId,
			data: {
				...list,
				archived: false,
			},
		});
		setArchivedLists(archivedLists.filter(({ _id }) => _id !== list._id));
	};

	const checkTasksPermission = (listId: string) => {
		const hasTasks = tasks.some(({ list }) => list === listId);

		if (hasTasks) {
			return canDeleteTasks;
		}

		return true;
	};

	const filtered = archivedLists.filter(({ label }) =>
		label.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="flex flex-col overflow-y-auto">
			{filtered.map(list => (
				<div key={list._id} className="flex flex-col p-2">
					<p>{list.label}</p>
					{canEdit && (
						<div className="flex flex-row mt-1 gap-2">
							<button
								className="text-foreground hover:text-success transition-colors text-tiny"
								onClick={() => restoreList(list)}
							>
								{t('actions.restore')}
							</button>

							{checkTasksPermission(list._id) && (
								<Popover placement="bottom" offset={0} radius="md">
									<PopoverTrigger>
										<button className="text-foreground hover:text-danger transition-colors text-tiny">
											{t('actions.delete')}
										</button>
									</PopoverTrigger>
									<PopoverContent className="p-2 gap-2 w-72">
										<p className="text-center">{t('board.list_delete_warn')}</p>
										<Button
											variant="solid"
											color="danger"
											fullWidth
											radius="sm"
											onPress={() => removeList(list)}
										>
											{t('board.list_delete')}?
										</Button>
									</PopoverContent>
								</Popover>
							)}
						</div>
					)}
					<Divider className="mt-2" />
				</div>
			))}
		</div>
	);
};
