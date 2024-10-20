'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useBoardMembers } from '@/hooks/useBoardMembers';

type LeaveBoardPopoverProps = {
	boardId: string;
	onAction: (boardId: string) => void;
};

export const LeaveBoardPopover: React.FC<LeaveBoardPopoverProps> = ({ boardId, onAction }) => {
	const t = useTranslations();
	const { leave } = useBoardMembers();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const leaveBoard = () => {
		leave.mutate(boardId);
	};

	useEffect(() => {
		if (leave.isSuccess) {
			setIsOpen(false);
			onAction(boardId);
		}
	}, [leave.isSuccess]);

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
					onPress={leaveBoard}
					spinnerPlacement="end"
					isLoading={leave.isPending}
					isDisabled={leave.isPending}
				>
					{t('board.delete')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
