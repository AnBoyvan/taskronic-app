'use client';

import { useTranslations } from 'next-intl';

import { Button, User } from '@nextui-org/react';

import { colorVariants } from '@/constants/color-variants.constants';
import { useInviteModal } from '@/hooks/useInviteModal';
import { useUser } from '@/hooks/useUser';
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
	const { workspaces } = useUser();
	const { _id, name, email, initials, avatar } = member;
	const { invite, isAdmin } = permissions;

	const memberBoards = boards.filter(board => isBoardMember(board, member._id));
	const isMemberAdmin = Boolean(admins.includes(member._id));
	const isGuest = Boolean(!membersIds.includes(member._id));

	const isOnlyAdmin = isMemberAdmin && admins.length < 2;

	const current = workspaces.find(({ _id }) => _id === workspaceId);

	return (
		<div className="flex flex-wrap flex-row gap-4 w-full justify-between px-2">
			<User
				name={name}
				description={email}
				className="min-w-64 justify-start"
				avatarProps={{
					name: initials,
					classNames: {
						base: `${colorVariants[avatar]}`,
					},
				}}
			/>
			<div className="flex flex-row gap-4 justify-between items-center">
				<MemberBoards
					workspaceId={workspaceId}
					userId={member._id}
					userName={member.name}
					userBoards={memberBoards}
					isAdmin={isAdmin}
				/>
				<SetWorkspaceAdmin
					workspaceId={workspaceId}
					isAdmin={isAdmin}
					userId={_id}
					userName={name}
					isMemberAdmin={isMemberAdmin}
					isOnlyAdmin={isOnlyAdmin}
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
						isOnlyAdmin={isOnlyAdmin}
					/>
				)}
			</div>
		</div>
	);
};
