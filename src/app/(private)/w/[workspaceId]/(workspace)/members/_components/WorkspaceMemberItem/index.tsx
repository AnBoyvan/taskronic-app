'use client';

import { useTranslations } from 'next-intl';

import { Button, User } from '@nextui-org/react';

import { colorVariants } from '@/constants/color-variants.constants';
import { useInviteModal } from '@/hooks/useInviteModal';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { BoardBasic } from '@/types/board.interface';
import { Member } from '@/types/root.interface';
import { WorkspacePermissions } from '@/types/workspace.interface';
import { isBoardMember } from '@/utils/helpers/isBoardMember';

import { MemberBoards } from './MemberBoards';
import { RemoveWorkspaceMember } from './RemoveWorkspaceMember';
import { SetWorkspaceAdmin } from './SetWorkspaceAdmin';

type WorkspaceMemberItemProps = {
	member: Member;
	admins: string[];
	membersIds: string[];
	boards: BoardBasic[];
	permissions: WorkspacePermissions;
	workspaceId: string;
	currentUserId?: string;
};

export const WorkspaceMemberItem: React.FC<WorkspaceMemberItemProps> = ({
	member,
	admins,
	membersIds,
	boards,
	permissions,
	workspaceId,
	currentUserId,
}) => {
	const t = useTranslations();
	const modal = useInviteModal();
	const { current } = useWorkspacesList();

	const { _id, name, email, avatarName, avatarColor } = member;
	const { invite, isAdmin } = permissions;

	const memberBoards = boards.filter(board => isBoardMember(board, member._id));
	const isMemberAdmin = Boolean(admins.includes(member._id));
	const isGuest = Boolean(!membersIds.includes(member._id));

	return (
		<div className="flex flex-wrap flex-row gap-4 w-full justify-between px-2">
			<User
				name={name}
				description={email}
				className="min-w-64 justify-start"
				avatarProps={{
					name: avatarName,
					classNames: {
						base: `${colorVariants[avatarColor]}`,
					},
				}}
			/>
			<div className="flex flex-row gap-4 justify-between items-center">
				<MemberBoards
					workspaceId={workspaceId}
					userId={member._id}
					userBoards={memberBoards}
					isAdmin={isAdmin}
				/>
				<SetWorkspaceAdmin
					workspaceId={workspaceId}
					isAdmin={isAdmin}
					userId={_id}
					userName={name}
					isMemberAdmin={isMemberAdmin}
				/>
				{isGuest ? (
					<Button
						variant="ghost"
						color="primary"
						size="sm"
						isDisabled={!invite}
						className="w-20"
						onPress={() => {
							if (current) {
								modal.onOpen(current, [email]);
							}
						}}
					>
						{t('workspace.invite')}
					</Button>
				) : (
					<RemoveWorkspaceMember
						workspaceId={workspaceId}
						isAdmin={isAdmin}
						userId={_id}
						userName={name}
						currentUserId={currentUserId}
					/>
				)}
			</div>
		</div>
	);
};
