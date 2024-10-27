'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { Button, Divider } from '@nextui-org/react';

import { ROUTES } from '@/configs/routes.config';
import { useBoardMenu } from '@/hooks/useBoardMenu';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';

type BoardMenuDeleteProps = {
	boardId: string;
	isAdmin: boolean;
	workspaceId?: string;
};

export const BoardMenuDelete: React.FC<BoardMenuDeleteProps> = ({
	boardId,
	isAdmin,
	workspaceId,
}) => {
	const t = useTranslations();
	const router = useRouter();
	const { onClose, onOpen } = useBoardMenu();
	const { deleteBoard } = useBoardsEdit();

	const removeBoard = () => {
		deleteBoard.mutate(boardId);
	};

	useEffect(() => {
		if (deleteBoard.isSuccess) {
			onClose();

			if (workspaceId) {
				router.push(`${ROUTES.WORKSPACE}/${workspaceId}`);
			}

			if (!workspaceId) {
				router.push(`${ROUTES.BOARDS}`);
			}
		}
	}, [deleteBoard.isSuccess]);

	return (
		<div className="flex flex-col">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('board.delete')}?
			</div>
			<Divider className="my-2" />
			<p className="text-center">{t('board.remove_warn')}</p>
			<div className="flex flex-row gap-4">
				<Button
					fullWidth
					variant="bordered"
					color="default"
					onPress={() => onOpen('main')}
					isDisabled={deleteBoard.isPending}
				>
					{t('actions.back')}
				</Button>
				<Button
					fullWidth
					variant="solid"
					color="danger"
					onPress={removeBoard}
					spinnerPlacement="end"
					isLoading={deleteBoard.isPending}
					isDisabled={deleteBoard.isPending || !isAdmin}
				>
					{t('actions.remove')}
				</Button>
			</div>
		</div>
	);
};
