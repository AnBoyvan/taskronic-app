'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { useState } from 'react';

import { Board } from '@/components/shared/Board';
import { BoardListWrapper } from '@/components/shared/BoardListWrapper';
import { CreateBoardButton } from '@/components/shared/CreateBoardButton';
import { useCreateModal } from '@/hooks/useCreateModal';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useFetchCurrentWorkspace } from '@/hooks/useFetchCurrentWorkspace';
import { getWorkspacePermissions } from '@/utils/helpers/getWorkspacePermission';
import { sorter } from '@/utils/helpers/sorter';

import { WorkspaceTitle } from '../WorkspaceTitle';
import { WorkspaceBoardsFilter } from './WorkspaceBoardsFilter';

export const WorkspaceBoards: React.FC = () => {
	const t = useTranslations();
	const { workspaceId } = useParams<{ workspaceId: string }>();
	const { user } = useCurrentUser();
	const modal = useCreateModal();

	const [filter, setFilter] = useState<WorkspaceBoardsFilter>({
		sortBy: {
			field: 'createdAt',
			order: 'desc',
			label: 'sort.by_created_desc',
		},
		search: '',
		closed: 'hide',
	});

	const { data: workspace } = useFetchCurrentWorkspace(workspaceId);

	if (!workspace) return null;

	const { isAdmin, createBoard } = getWorkspacePermissions(workspace, user ? user.sub : '');

	const sorted = sorter(workspace.boards, filter.sortBy.field as any, filter.sortBy.order);

	const showHidden = sorted.filter(({ closed }) => (filter.closed === 'hide' ? !closed : true));

	const searched = showHidden.filter(({ title }) =>
		title.toLowerCase().includes(filter.search.toLowerCase()),
	);

	const createNewBoard = () => {
		modal.onOpen('board', workspace._id);
	};

	return (
		<div className="w-full flex flex-col items-center overflow-y-scroll">
			<WorkspaceTitle workspace={workspace} />
			<h2 className="self-start mt-4 lg:mt-8 px-4 lg:px-8 text-lg font-medium">
				{t('nav.boards')}
			</h2>
			<WorkspaceBoardsFilter filter={filter} setFilter={setFilter} />
			<BoardListWrapper>
				<CreateBoardButton isDisabled={!createBoard} onPress={createNewBoard} />
				{searched.map(board => (
					<Board key={board._id} board={board} isWorkspaceAdmin={isAdmin} />
				))}
			</BoardListWrapper>
		</div>
	);
};
