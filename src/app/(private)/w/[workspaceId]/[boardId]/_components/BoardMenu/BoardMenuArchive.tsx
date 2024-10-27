'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Divider, Input } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { Board, BoardPermissions } from '@/types/board.interface';

import { BoardMenuArchivedLists } from './BoardMenuArchivedLists';
import { BoardMenuArchivedTasks } from './BoardMenuArchivedTasks';

type BoardMenuArchiveProps = {
	board: Board;
	permissions: BoardPermissions;
};

export const BoardMenuArchive: React.FC<BoardMenuArchiveProps> = ({ board, permissions }) => {
	const t = useTranslations();
	const [showTasks, setItemsType] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('common.archive')}&nbsp;
				<span className="font-normal">
					&#10088;{t(showTasks ? 'common.tasks' : 'common.lists')}&#10089;
				</span>
			</div>
			<Divider className="my-2" />
			<div className="flex flex-row gap-4">
				<Input
					variant="bordered"
					size="md"
					radius="sm"
					placeholder={t('common.search')}
					startContent={<Icon name="Search" size={16} />}
					type="search"
					value={search}
					onValueChange={value => setSearch(value)}
				/>
				<Button
					size="md"
					variant="solid"
					radius="sm"
					color="primary"
					onPress={() => setItemsType(!showTasks)}
				>
					{t(showTasks ? 'common.lists' : 'common.tasks')}
				</Button>
			</div>
			<Divider className="mt-2" />
			{showTasks ? (
				<BoardMenuArchivedTasks
					tasks={board.tasks.filter(({ archived }) => archived)}
					search={search}
					canRestoreTask={permissions.archiveTask}
					canDeleteTasks={permissions.deleteTask}
				/>
			) : (
				<BoardMenuArchivedLists
					lists={board.lists.filter(({ archived }) => archived)}
					boardId={board._id}
					canEdit={permissions.lists}
					tasks={board.tasks}
					canDeleteTasks={permissions.deleteTask}
					search={search}
				/>
			)}
		</div>
	);
};
