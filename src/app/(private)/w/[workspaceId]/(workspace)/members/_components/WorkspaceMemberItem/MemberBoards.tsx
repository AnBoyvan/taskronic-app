'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import {
	Button,
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@nextui-org/react';

import { ROUTES } from '@/configs/routes.config';
import { useBoardMembers } from '@/hooks/useBoardMembers';
import { BoardBasic } from '@/types/board.interface';

type WorkspaceMemberItemProps = {
	userId: string;
	userName: string;
	userBoards: BoardBasic[];
	workspaceId: string;
	isAdmin: boolean;
};

export const MemberBoards: React.FC<WorkspaceMemberItemProps> = ({
	userId,
	userName,
	userBoards,
	workspaceId,
	isAdmin,
}) => {
	const t = useTranslations();
	const { removeMember } = useBoardMembers();

	const [userBoardsList, setUserBoardsList] = useState<BoardBasic[]>(userBoards);

	const handleRemoveMember = (boardId: string) => {
		removeMember.mutate({
			boardId,
			dto: {
				_id: userId,
				name: userName,
			},
		});
		setUserBoardsList(userBoardsList.filter(board => board._id !== boardId));
	};

	const canRemove = (board: BoardBasic) => {
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
					{userBoardsList.map(board => (
						<ListboxItem
							key={board._id}
							textValue={board._id}
							href={`${ROUTES.WORKSPACE}/${workspaceId}/${board._id}`}
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
									onPress={() => handleRemoveMember(board._id)}
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
