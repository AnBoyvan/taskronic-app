'use client';

import { useEffect, useState } from 'react';

import { BoardView as BoardViewOption } from '@/configs/board-view.config';
import { useBoardState } from '@/hooks/useBoardState';
import { Board as BoardType } from '@/types/board.interface';

import { BoardDashboard } from './BoardDashboard';
import { BoardGridView } from './BoardGridView';
import { BoardSchedule } from './BoardSchedule';
import { BoardTableView } from './BoardTableView';
import { BoardView } from './BoardView';

type BoardProps = {
	board: BoardType;
};

export const Board: React.FC<BoardProps> = ({ board }) => {
	const { view } = useBoardState(board._id);

	const [boardView, setBoardView] = useState<BoardViewOption>(BoardViewOption.board);

	useEffect(() => {
		setBoardView(view);
	}, [view]);

	if (boardView === BoardViewOption.table) {
		return <BoardTableView board={board} />;
	}

	if (boardView === BoardViewOption.dashboard) {
		return <BoardDashboard board={board} />;
	}

	if (boardView === BoardViewOption.schedule) {
		return <BoardSchedule board={board} />;
	}

	if (boardView === BoardViewOption.grid) {
		return <BoardGridView board={board} />;
	}

	return <BoardView board={board} />;
};
