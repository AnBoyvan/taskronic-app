'use client';

import { useTranslations } from 'next-intl';

import { useMemo, useState } from 'react';

import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { BoardCard } from '@/components/shared/BoardCard';
import { BoardListWrapper } from '@/components/shared/BoardListWrapper';
import { CreateBoardButton } from '@/components/shared/CreateBoardButton';
import { useCreateModal } from '@/hooks/useCreateModal';
import { useCurrentUser } from '@/hooks/useCurrentUser';
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
	const { user } = useCurrentUser();

	const [filter, setFilter] = useState<WorkspaceBoardsFilter>({
		sortBy: {
			field: 'createdAt',
			order: 'desc',
			label: 'sort.by_created_desc',
		},
		search: '',
		closed: 'hide',
	});

	const permissions = getWorkspacePermissions(workspace, user?.sub);

	const filteredBoards = useMemo(() => {
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

		return searched;
	}, [workspace.boards, filter]);

	const createNewBoard = () => {
		modal.onOpen('board');
	};

	return (
		<PageContainer scroll title={t('nav.boards')}>
			<Section>
				<WorkspaceBoardsFilter filter={filter} setFilter={setFilter} />
			</Section>
			<Section>
				<BoardListWrapper>
					{permissions.createBoard && (
						<CreateBoardButton isDisabled={!permissions.createBoard} onPress={createNewBoard} />
					)}
					{filteredBoards.map(board => (
						<BoardCard key={board._id} board={board} />
					))}
				</BoardListWrapper>
			</Section>
		</PageContainer>
	);
};
