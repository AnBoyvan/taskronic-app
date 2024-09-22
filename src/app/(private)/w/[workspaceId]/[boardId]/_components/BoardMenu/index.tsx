'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@nextui-org/react';

import { AnimatePresence, motion } from 'framer-motion';

import { Icon } from '@/components/ui/Icon';
import { useBoardMenu } from '@/hooks/useBoardMenu';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Board } from '@/types/board.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

import { BoardMenuActivity } from './BoardMenuActivity';
import { BoardMenuAddMembers } from './BoardMenuAddMembers';
import { BoardMenuBackground } from './BoardMenuBackground';
import { BoardMenuClose } from './BoardMenuClose';
import { BoardMenuComments } from './BoardMenuComments';
import { BoardMenuInfo } from './BoardMenuInfo';
import { BoardMenuLeave } from './BoardMenuLeave';
import { BoardMenuMain } from './BoardMenuMain';
import { BoardMenuMembers } from './BoardMenuMembers';
import { BoardMenuSettings } from './BoardMenuSettings';

type BoardMenuProps = {
	board: Board;
};

const variants = {
	enterFromLeft: { x: '-100%', opacity: 0 },
	enterFromRight: { x: '100%', opacity: 0 },
	center: { x: 0, opacity: 1 },
	exitToRight: { x: '100%', opacity: 0 },
	exitToLeft: { x: '-100%', opacity: 0 },
};

export const BoardMenu: React.FC<BoardMenuProps> = ({ board }) => {
	const t = useTranslations();
	const { user } = useCurrentUser();
	const { isOpen, section, onOpen, onClose } = useBoardMenu();

	const { _id, description } = board;

	const { updateBoard, isAdmin, addMember } = getBoardPermissions(board, user?.sub);

	return (
		<div
			className={`absolute bg-background  z-[60] h-full top-0 right-0 transition-all duration-200 ${!isOpen ? 'w-0' : 'w-80 p-2'} overflow-hidden`}
		>
			<Button
				isIconOnly
				variant="light"
				size="sm"
				onPress={onClose}
				className="absolute top-3 right-3 z-10"
			>
				<Icon name="X" size={16} />
			</Button>

			{section !== 'main' && (
				<Button
					isIconOnly
					variant="light"
					size="sm"
					onPress={() => onOpen('main')}
					className="absolute top-3 left-3 z-10"
				>
					<Icon name="ChevronLeft" size={16} />
				</Button>
			)}

			<AnimatePresence mode="wait">
				<motion.div
					key={section}
					initial={section === 'main' ? 'enterFromLeft' : 'enterFromRight'}
					animate="center"
					exit={section === 'main' ? 'exitToLeft' : 'exitToRight'}
					variants={variants}
					transition={{ duration: 0.2 }}
					className="w-full h-full"
				>
					{section === 'main' && <BoardMenuMain description={description} />}
					{section === 'activity' && <BoardMenuActivity boardId={_id} />}
					{section === 'comments' && <BoardMenuComments boardId={_id} />}
					{section === 'info' && <BoardMenuInfo board={board} canUpdate={updateBoard} />}
					{section === 'background' && (
						<BoardMenuBackground board={board} canUpdate={updateBoard} />
					)}
					{section === 'members' && (
						<BoardMenuMembers
							board={board}
							isAdmin={isAdmin}
							canAdd={addMember}
							currentUserId={user?.sub}
						/>
					)}
					{section === 'addMembers' && <BoardMenuAddMembers board={board} />}
					{section === 'settings' && <BoardMenuSettings board={board} canUpdate={isAdmin} />}
					{section === 'close' && <BoardMenuClose boardId={_id} />}
					{section === 'leave' && <BoardMenuLeave boardId={_id} />}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
