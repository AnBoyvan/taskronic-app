'use client';

import { useTranslations } from 'next-intl';

import { Button, User } from '@nextui-org/react';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { BoardWorkspaceField } from '@/interfaces/board.interface';
import { Member } from '@/interfaces/root.interface';
import { colorVariants } from '@/styles/colorVariants';

import { MemberBoards } from './MemberBoards';
import { RemoveWorkspaceMember } from './RemoveWorkspaceMember';
import { SetWorkspaceAdmin } from './SetWorkspaceAdmin';

type WorkspaceMemberItemProps = {
	member: Member;
	membersIds: string[];
	admins: string[];
	userBoards: BoardWorkspaceField[];
	workspaceId: string;
	canInvite: boolean;
};

export const WorkspaceMemberItem: React.FC<WorkspaceMemberItemProps> = ({
	member,
	membersIds,
	admins,
	userBoards,
	workspaceId,
	canInvite,
}) => {
	const t = useTranslations();
	const { user } = useCurrentUser();

	const { name, email, avatarName, avatarColor } = member;

	const isCurrentUserAmin = Boolean(user && admins.includes(user.sub));
	const isAdmin = Boolean(admins.includes(member._id));
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
					userBoards={userBoards}
					isCurrentUserAmin={isCurrentUserAmin}
				/>
				<SetWorkspaceAdmin
					workspaceId={workspaceId}
					isCurrentUserAmin={isCurrentUserAmin}
					userId={member._id}
					userName={name}
					isAdmin={isAdmin}
					isGuest={isGuest}
				/>
				{isGuest ? (
					<Button
						variant="ghost"
						color="primary"
						size="sm"
						isDisabled={!isCurrentUserAmin && !canInvite}
						className="w-20"
						onPress={() => {
							// TODO:
							console.log('INVITE');
						}}
					>
						{t('workspace.invite')}
					</Button>
				) : (
					<RemoveWorkspaceMember
						workspaceId={workspaceId}
						isCurrentUserAmin={isCurrentUserAmin}
						userId={member._id}
						userName={name}
						currentUserId={user?.sub!}
					/>
				)}
			</div>
		</div>
	);
};
