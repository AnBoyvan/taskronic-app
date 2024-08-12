'use client';

import { useTranslations } from 'next-intl';

import { useMemo, useState } from 'react';

import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Board } from '@/components/shared/Board';
import { BoardListWrapper } from '@/components/shared/BoardListWrapper';
import { CreateBoardButton } from '@/components/shared/CreateBoardButton';
import { useCreateModal } from '@/hooks/useCreateModal';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { BoardWorkspaceField } from '@/types/board.interface';
import { sorter } from '@/utils/helpers/sorter';

import { WorkspaceBoardsFilter } from './_components/WorkspaceBoardsFilter';

export default function WorkspaceBoardsPage() {
	const t = useTranslations();
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

	const { current, permissions } = useWorkspacesList();

	const filteredBoards = useMemo(() => {
		if (!current) return [];

		const sortedBoards = sorter(
			current.boards,
			filter.sortBy.field as keyof BoardWorkspaceField,
			filter.sortBy.order,
		);

		const showHidden = sortedBoards.filter(({ closed }) =>
			filter.closed === 'hide' ? !closed : true,
		);

		const searched = showHidden.filter(({ title }) =>
			title.toLowerCase().includes(filter.search.toLowerCase()),
		);

		return searched;
	}, [current?.boards, filter]);

	const createNewBoard = () => {
		modal.onOpen('board', current?._id);
	};

	return (
		<PageContainer scroll>
			<Section title={t('nav.boards')}>
				<WorkspaceBoardsFilter filter={filter} setFilter={setFilter} />
			</Section>
			<Section>
				<BoardListWrapper>
					<CreateBoardButton isDisabled={!permissions.createBoard} onPress={createNewBoard} />
					{filteredBoards.map(board => (
						<Board key={board._id} board={board} isWorkspaceAdmin={permissions.isAdmin} />
					))}
				</BoardListWrapper>
			</Section>
		</PageContainer>
	);
}
