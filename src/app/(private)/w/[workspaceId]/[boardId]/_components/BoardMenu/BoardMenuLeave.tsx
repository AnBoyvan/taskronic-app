'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { Button, Divider } from '@nextui-org/react';

import { toast } from 'sonner';

import { ROUTES } from '@/configs/routes.config';
import { useBoardMembers } from '@/hooks/useBoardMembers';
import { useBoardMenu } from '@/hooks/useBoardMenu';

type BoardMenuLeaveProps = {
	boardId: string;
	workspaceId?: string;
	isAdmin: boolean;
	boardAdmins: string[];
};

export const BoardMenuLeave: React.FC<BoardMenuLeaveProps> = ({
	boardId,
	workspaceId,
	isAdmin,
	boardAdmins,
}) => {
	const t = useTranslations();
	const { leave } = useBoardMembers();
	const { onClose, onOpen } = useBoardMenu();
	const router = useRouter();

	const isOnlyAdmin = isAdmin && boardAdmins.length < 2;

	const leaveBoard = () => {
		if (isOnlyAdmin) {
			toast.error(t('board.only_admin'));
			return;
		}
		leave.mutate(boardId);
	};

	useEffect(() => {
		if (leave.isSuccess) {
			onClose();

			if (workspaceId) {
				router.push(`${ROUTES.WORKSPACE}/${workspaceId}`);
			}

			if (!workspaceId) {
				router.push(`${ROUTES.BOARDS}`);
			}
		}
	}, [leave.isSuccess]);

	return (
		<div className="flex flex-col">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('board.leave')}?
			</div>
			<Divider className="my-2" />
			<div className="flex flex-row gap-4">
				<Button
					fullWidth
					variant="bordered"
					radius="sm"
					color="default"
					onPress={() => onOpen('main')}
					isDisabled={leave.isPending}
				>
					{t('actions.back')}
				</Button>
				<Button
					fullWidth
					variant="solid"
					radius="sm"
					color="danger"
					onPress={leaveBoard}
					isDisabled={leave.isPending}
					spinnerPlacement="end"
					isLoading={leave.isPending}
				>
					{t('actions.leave')}
				</Button>
			</div>
		</div>
	);
};
