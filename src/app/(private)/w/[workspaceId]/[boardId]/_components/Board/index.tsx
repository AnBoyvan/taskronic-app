'use client';

import { useEffect, useState } from 'react';

import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

import { Section } from '@/components/layout/Section';
import { Board as BoardType } from '@/types/board.interface';

import { BoardsListsView } from '../BoardsListsView';

type BoardView = 'lists' | 'table';

type BoardProps = {
	board: BoardType;
};

export const Board: React.FC<BoardProps> = ({ board }) => {
	const [view, setView] = useState<BoardView | null>(null);
	const isMobile = useMediaQuery('(max-width:640px)');
	const [boardView, setBoardView] = useLocalStorage<BoardView | undefined>(
		`board-${board._id}`,
		undefined,
	);

	useEffect(() => {
		if (boardView && view !== boardView) {
			setView(boardView);
		}

		if (!view && !boardView) {
			const defaultView = isMobile ? 'table' : 'lists';
			setView(defaultView);
			setBoardView(defaultView);
		}
	}, [view, boardView, isMobile, setBoardView]);

	return (
		<Section noTopMargin className="p-0 h-full overflow-hidden">
			<BoardsListsView board={board} />
		</Section>
	);
};
