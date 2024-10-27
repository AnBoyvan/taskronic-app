'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { boardColors } from '@/constants/board-colors.constants';
import { Board } from '@/types/board.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

import { DeleteBoardPopover } from './DeleteBoardPopover';
import { LeaveBoardPopover } from './LeaveBoardPopover';
import { OpenBoardPopover } from './OpenBoardPopover';

type ClosedBoardsProps = {
	boards: Board[];
	userId?: string;
};

export const ClosedBoards: React.FC<ClosedBoardsProps> = ({ boards, userId }) => {
	const t = useTranslations();
	const router = useRouter();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [closedBoards, setClosedBoards] = useState<Board[]>([]);

	const isBoardAdmin = (board: Board): boolean => {
		const { isAdmin } = getBoardPermissions(board, userId);
		return isAdmin;
	};

	const onAction = (boardId: string) => {
		setClosedBoards(closedBoards.filter(({ _id }) => _id !== boardId));
		router.refresh();
	};

	useEffect(() => {
		setClosedBoards(boards);
	}, [boards]);

	return (
		<>
			<Button
				variant="solid"
				color="default"
				size="md"
				radius="sm"
				onPress={() => setIsOpen(true)}
				className="min-h-10"
			>
				{t('board.show_closed')}
			</Button>
			<Modal
				size="3xl"
				scrollBehavior="outside"
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				placement="center"
				backdrop="blur"
				radius="md"
				classNames={{
					closeButton: 'right-2 top-2',
				}}
				closeButton={
					<Button isIconOnly variant="light" size="md">
						<Icon name="X" size={20} />
					</Button>
				}
			>
				<ModalContent className="flex-col justify-start p-3 min-h-[400px]">
					<ModalHeader className="p-3 gap-2 items-center text-center">
						<Icon name="MonitorX" size={20} />
						<span>{t('board.closed_boards')}</span>
					</ModalHeader>
					<ModalBody className="w-full p-0 flex flex-col gap-2">
						{closedBoards.map(board => (
							<div
								key={board._id}
								className="flex flex-row items-center justify-between border-b border-divider py-2"
							>
								<div className="flex flex-row gap-1 w-full overflow-hidden items-center">
									<div
										style={
											board.thumbImage ? { backgroundImage: `url(${board.thumbImage})` } : undefined
										}
										className={clsx(
											'h-8 w-10 min-h-8 min-w-10 rounded shadow-sm bg-cover',
											board.bgColor && `${boardColors[board.bgColor]}`,
										)}
									/>

									<span className="text-start text-xs truncate w-full">{board.title}</span>
								</div>
								{isBoardAdmin(board) ? (
									<div className="flex flex-col md:flex-row gap-2">
										<OpenBoardPopover
											boardId={board._id}
											workspaceId={board.workspace?._id}
											onAction={onAction}
										/>
										<DeleteBoardPopover boardId={board._id} onAction={onAction} />
									</div>
								) : (
									<LeaveBoardPopover boardId={board._id} onAction={onAction} />
								)}
							</div>
						))}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
