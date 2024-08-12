'use client';

import { useTranslations } from 'next-intl';

import { Button, User } from '@nextui-org/react';

import { colorVariants } from '@/constants/color-variants.constants';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { Member } from '@/types/root.interface';
import { getAllUsers } from '@/utils/helpers/getAllUsers';
import { isBoardMember } from '@/utils/helpers/isBoardMember';

import { MemberBoards } from './MemberBoards';
import { RemoveWorkspaceMember } from './RemoveWorkspaceMember';
import { SetWorkspaceAdmin } from './SetWorkspaceAdmin';

type WorkspaceMemberItemProps = {
	member: Member;
	admins: string[];
};

export const WorkspaceMemberItem: React.FC<WorkspaceMemberItemProps> = ({ member, admins }) => {
	const t = useTranslations();
	const {
		current,
		permissions: { invite, isAdmin },
	} = useWorkspacesList();
	const { user } = useCurrentUser();

	const { _id, name, email, avatarName, avatarColor } = member;

	if (!current) return null;

	const { membersIds } = getAllUsers(current);

	const memberBoards = current.boards.filter(board => isBoardMember(board, member._id));
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
					workspaceId={current._id}
					userId={member._id}
					userBoards={memberBoards}
					isAdmin={isAdmin}
				/>
				<SetWorkspaceAdmin
					workspaceId={current._id}
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
							// TODO:
							console.log('INVITE');
						}}
					>
						{t('workspace.invite')}
					</Button>
				) : (
					<RemoveWorkspaceMember
						workspaceId={current._id}
						isAdmin={isAdmin}
						userId={_id}
						userName={name}
						currentUserId={user?.sub!}
					/>
				)}
			</div>
		</div>
	);
};
