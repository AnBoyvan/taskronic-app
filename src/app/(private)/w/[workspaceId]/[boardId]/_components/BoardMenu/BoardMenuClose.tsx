'use client';

import { useTranslations } from 'next-intl';

import { Button, Divider } from '@nextui-org/react';

import { useBoardMenu } from '@/hooks/useBoardMenu';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';

type BoardMenuCloseProps = {
	boardId: string;
};

export const BoardMenuClose: React.FC<BoardMenuCloseProps> = ({ boardId }) => {
	const t = useTranslations();
	const { onClose, onOpen } = useBoardMenu();
	const { close } = useBoardsEdit();

	return (
		<div className="flex flex-col">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('board.close')}?
			</div>
			<Divider className="my-2" />
			<div className="flex flex-row gap-4">
				<Button
					fullWidth
					variant="bordered"
					color="default"
					onPress={() => onOpen('main')}
					isDisabled={close.isPending}
				>
					{t('common.back')}
				</Button>
				<Button
					fullWidth
					variant="solid"
					color="danger"
					onPress={() => {
						close.mutate(boardId);
						onClose();
					}}
					isDisabled={close.isPending}
				>
					{t('common.close')}
				</Button>
			</div>
		</div>
	);
};
