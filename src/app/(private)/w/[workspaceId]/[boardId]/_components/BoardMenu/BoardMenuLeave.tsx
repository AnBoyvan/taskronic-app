'use client';

import { useTranslations } from 'next-intl';

import { Button, Divider } from '@nextui-org/react';

import { useBoardMembers } from '@/hooks/useBoardMembers';
import { useBoardMenu } from '@/hooks/useBoardMenu';

type BoardMenuLeaveProps = {
	boardId: string;
};

export const BoardMenuLeave: React.FC<BoardMenuLeaveProps> = ({ boardId }) => {
	const t = useTranslations();
	const { leave } = useBoardMembers();
	const { onClose, onOpen } = useBoardMenu();

	return (
		<div className="flex flex-col">
			<div className="h-10 flex items-center justify-center font-medium">
				{t('board.leave_board')}?
			</div>
			<Divider className="my-2" />
			<div className="flex flex-row gap-4">
				<Button
					fullWidth
					variant="bordered"
					color="default"
					onPress={() => onOpen('main')}
					isDisabled={leave.isPending}
				>
					{t('common.back')}
				</Button>
				<Button
					fullWidth
					variant="solid"
					color="danger"
					onPress={() => {
						leave.mutate(boardId);
						onClose();
					}}
					isDisabled={leave.isPending}
				>
					{t('common.leave')}
				</Button>
			</div>
		</div>
	);
};
