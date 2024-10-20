'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useBoardsEdit } from '@/hooks/useBoardsEdit';

type DeleteBoardPopoverProps = {
	boardId: string;
	onAction: (boardId: string) => void;
};

export const DeleteBoardPopover: React.FC<DeleteBoardPopoverProps> = ({ boardId, onAction }) => {
	const t = useTranslations();
	const { deleteBoard } = useBoardsEdit();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const removeBoard = () => {
		deleteBoard.mutate(boardId);
	};

	useEffect(() => {
		if (deleteBoard.isSuccess) {
			setIsOpen(false);
			onAction(boardId);
		}
	}, [deleteBoard.isSuccess]);

	return (
		<Popover isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
			<PopoverTrigger>
				<Button size="sm" variant="solid" color="danger">
					{t('common.delete')}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-2 w-64 flex-col gap-2">
				<p className="text-center">{t('board.remove_warn')}</p>
				<Button
					fullWidth
					variant="solid"
					color="danger"
					onPress={removeBoard}
					spinnerPlacement="end"
					isLoading={deleteBoard.isPending}
					isDisabled={deleteBoard.isPending}
				>
					{t('board.delete')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
