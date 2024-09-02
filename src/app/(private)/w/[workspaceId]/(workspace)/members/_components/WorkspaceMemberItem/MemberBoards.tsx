'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import {
	Button,
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@nextui-org/react';

import { ROUTES } from '@/configs/routes.config';
import { BoardWorkspaceField } from '@/types/board.interface';

type WorkspaceMemberItemProps = {
	userId: string;
	userBoards: BoardWorkspaceField[];
	workspaceId: string;
	isAdmin: boolean;
};

export const MemberBoards: React.FC<WorkspaceMemberItemProps> = ({
	userId,
	userBoards,
	workspaceId,
	isAdmin,
}) => {
	const t = useTranslations();
	const router = useRouter();

	const moveToBoard = (boardId: string) => {
		router.push(`${ROUTES.WORKSPACE}/${workspaceId}/${boardId}`);
	};

	const removeMember = (boardId: string) => {
		// TODO:
		console.log('REMOVE MEMBER');
	};

	const canRemove = (board: BoardWorkspaceField) => {
		const isBoardAdmin = board.admins.includes(userId);
		const isOnlyAdmin = board.admins.length < 2;

		if (isBoardAdmin && isOnlyAdmin) {
			return false;
		}

		return isAdmin;
	};

	return (
		<Popover shouldFlip offset={0} shadow="lg" radius="sm">
			<PopoverTrigger>
				<Button
					isDisabled={userBoards.length < 1}
					variant="ghost"
					color="default"
					size="sm"
					className="w-20"
				>
					{`${t('nav.boards')} (${userBoards.length})`}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="p-0">
				<span className="text-center pt-2">{t('workspace.ws_boards')}</span>
				<Listbox
					className="w-64 flex flex-col overflow-y-auto gap-2 p-2"
					emptyContent={t('workspace.no_boards')}
					aria-label={t('nav.boards')}
				>
					{userBoards.map(board => (
						<ListboxItem
							key={board._id}
							textValue={board._id}
							onPress={() => moveToBoard(board._id)}
							classNames={{
								title: 'flex flex-row items-center justify-between gap-2 truncate',
							}}
						>
							<span>{board.title}</span>
							{canRemove(board) && (
								<Button
									size="sm"
									variant="solid"
									color="danger"
									className="h-6"
									onPress={() => removeMember(board._id)}
								>
									{t('common.remove')}
								</Button>
							)}
						</ListboxItem>
					))}
				</Listbox>
			</PopoverContent>
		</Popover>
	);
};
