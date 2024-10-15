'use client';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { StarredSwitcher } from '@/components/ui/StarredSwitcher';
import { BoardMenuSection, useBoardMenu } from '@/hooks/useBoardMenu';
import { Board } from '@/types/board.interface';

import { BoardFilter } from './BoardFilter';
import { BoardMembers } from './BoardMembers';
import { BoardViewSwitcher } from './BoardViewSwitcher';

type BoardNavbarProps = {
	board: Board;
};

export const BoardNavbar: React.FC<BoardNavbarProps> = ({ board }) => {
	const { onOpen } = useBoardMenu();

	const openBoardMenu = (section: BoardMenuSection) => {
		onOpen(section);
	};

	return (
		<div className="relative w-full bg-background/50 flex flex-wrap lg:flex-nowrap justify-between items-center gap-x-10 p-2 pl-4 backdrop-blur-md text-foreground">
			<div className="flex items-center gap-2 w-full overflow-hidden">
				<p className="truncate">{board.title}</p>
				<StarredSwitcher board={board} />
			</div>
			<div className="flex ml-auto items-center gap-2">
				<BoardFilter board={board} />
				<BoardViewSwitcher boardId={board._id} />
				<BoardMembers board={board} />
				<Button isIconOnly variant="light" onPress={() => openBoardMenu('main')}>
					<Icon name="Ellipsis" size={20} className="text-foreground" />
				</Button>
			</div>
		</div>
	);
};
