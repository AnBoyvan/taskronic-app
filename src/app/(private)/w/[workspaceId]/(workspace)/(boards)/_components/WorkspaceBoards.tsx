'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { BoardCard } from '@/components/shared/BoardCard';
import { CreateBoardButton } from '@/components/shared/CreateBoardButton';
import { useCreateModal } from '@/hooks/useCreateModal';
import { useUser } from '@/hooks/useUser';
import { BoardBasic } from '@/types/board.interface';
import { Workspace } from '@/types/workspace.interface';
import { getWorkspacePermissions } from '@/utils/helpers/getWorkspacePermissions';
import { sorter } from '@/utils/helpers/sorter';

import { WorkspaceBoardsFilter } from './WorkspaceBoardsFilter';

type WorkspaceBoards = {
	workspace: Workspace;
};

export const WorkspaceBoards: React.FC<WorkspaceBoards> = ({ workspace }) => {
	const t = useTranslations();
	const modal = useCreateModal();
	const { _id } = useUser();

	const [filter, setFilter] = useState<WorkspaceBoardsFilter>({
		sortBy: {
			field: 'createdAt',
			order: 'desc',
			label: 'sort.by_created_desc',
		},
		search: '',
		closed: 'hide',
	});
	const [boardsList, setBoardsList] = useState<BoardBasic[]>(
		workspace.boards.filter(({ closed }) => !closed),
	);

	const permissions = getWorkspacePermissions(workspace, _id);

	useEffect(() => {
		const sortedBoards = sorter(
			workspace.boards,
			filter.sortBy.field as keyof BoardBasic,
			filter.sortBy.order,
		);

		const showHidden = sortedBoards.filter(({ closed }) =>
			filter.closed === 'hide' ? !closed : true,
		);

		const searched = showHidden.filter(({ title }) =>
			title.toLowerCase().includes(filter.search.toLowerCase()),
		);

		setBoardsList(searched);
	}, [filter, workspace]);

	const createNewBoard = () => {
		modal.onOpen('board');
	};

	return (
		<PageContainer scroll title={t('common.boards')}>
			<Section>
				<WorkspaceBoardsFilter filter={filter} setFilter={setFilter} />
			</Section>
			<Section>
				<div className="w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
					{permissions.createBoard && (
						<CreateBoardButton isDisabled={!permissions.createBoard} onPress={createNewBoard} />
					)}
					{boardsList.map(board => (
						<BoardCard key={board._id} board={board} />
					))}
				</div>
			</Section>
		</PageContainer>
	);
};
