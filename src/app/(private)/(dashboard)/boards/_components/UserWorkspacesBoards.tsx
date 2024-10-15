'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { BoardCard } from '@/components/shared/BoardCard';
import { CreateBoardButton } from '@/components/shared/CreateBoardButton';
import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { workspaceNav } from '@/configs/nav.config';
import { useCreateModal } from '@/hooks/useCreateModal';
import { useUser } from '@/hooks/useUser';
import { Board } from '@/types/board.interface';
import { WorkspaceBasic } from '@/types/workspace.interface';

type UserWorkspacesBoardsProps = {
	workspaces: WorkspaceBasic[];
	boards: Board[];
};

export const UserWorkspacesBoards: React.FC<UserWorkspacesBoardsProps> = ({
	workspaces,
	boards,
}) => {
	const t = useTranslations();
	const router = useRouter();
	const { _id } = useUser();
	const modal = useCreateModal();

	const canCreateBoard = (workspace: WorkspaceBasic): boolean => {
		const isMember = workspace.members.includes(_id);

		if (workspace.admins.includes(_id)) {
			return true;
		}

		if (isMember) {
			return workspace.settings.createBoard;
		}

		return false;
	};

	return (
		<Section noTopMargin className="flex flex-col gap-8">
			{workspaces.map(workspace => (
				<div key={workspace._id} className="flex flex-col">
					<div className="flex flex-col lg:flex-row gap-2 justify-between">
						<WorkspaceBadge
							className="overflow-hidden"
							name={workspace.name}
							avatarColor={workspace.avatarColor}
							avatarIcon={workspace.avatarIcon}
							largeText
							largeIcon
							truncateTitle
						/>
						<div className="flex flex-wrap md:flex-nowrap gap-2">
							{workspaceNav(workspace._id).map(({ label, value, icon }) => (
								<Button
									key={value}
									variant="solid"
									color="default"
									size="sm"
									startContent={<Icon name={icon} size={16} />}
									onPress={() => {
										router.push(value);
									}}
									endContent={
										label === 'common.members' ? (
											<span>{`(${workspace.members.length})`}</span>
										) : null
									}
								>
									{t(label)}
								</Button>
							))}
						</div>
					</div>
					<div className="w-full mt-2 grid gap-2 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
						{boards
							.filter(board => board.workspace?._id === workspace._id)
							.map(board => (
								<BoardCard key={board._id} board={board} />
							))}
						{canCreateBoard(workspace) && (
							<CreateBoardButton onPress={() => modal.onOpen('board')} />
						)}
					</div>
				</div>
			))}
		</Section>
	);
};
