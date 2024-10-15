'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { BoardCard } from '@/components/shared/BoardCard';
import { Icon } from '@/components/ui/Icon';
import { Board } from '@/types/board.interface';

type ClosedBoardsProps = {
	boards: Board[];
};

export const ClosedBoards: React.FC<ClosedBoardsProps> = ({ boards }) => {
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Button
				variant="solid"
				color="default"
				size="md"
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
					<ModalBody className="w-full p-0 grid gap-2 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
						{boards.map(board => (
							<BoardCard key={board._id} board={board} />
						))}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
