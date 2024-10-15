'use client';

import { useTranslations } from 'next-intl';

import { Button, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';

import { toast } from 'sonner';

import { colorVariants } from '@/constants/color-variants.constants';
import { useBoardMembers } from '@/hooks/useBoardMembers';
import { Member } from '@/types/root.interface';

type BoardMenuMemberItemProps = {
	member: Member;
	isMemberAdmin: boolean;
	boardAdmins: string[];
	canUpdate: boolean;
	boardId: string;
	isCurrentUser: boolean;
};

export const BoardMenuMemberItem: React.FC<BoardMenuMemberItemProps> = ({
	member,
	isMemberAdmin,
	boardAdmins,
	canUpdate,
	boardId,
	isCurrentUser,
}) => {
	const t = useTranslations();
	const { removeMember, addAdmin, removeAdmin, leave } = useBoardMembers();

	const { _id, name, email, initials, avatar } = member;

	const isOnlyAdmin = isMemberAdmin && boardAdmins.length < 2;

	const adminToggle = () => {
		if (isMemberAdmin) {
			if (isOnlyAdmin) {
				toast.error(t('board.last_admin'));
				return;
			}

			removeAdmin.mutate({ boardId, dto: { _id, name } });
		}

		if (!isMemberAdmin) {
			addAdmin.mutate({ boardId, dto: { _id, name } });
		}
	};

	const remove = () => {
		if (isOnlyAdmin) {
			toast.error(t('board.last_admin'));
			return;
		}
		removeMember.mutate({ boardId, dto: { _id, name } });
	};

	const leaveBoard = () => {
		if (isOnlyAdmin) {
			toast.error(t('board.last_admin'));
			return;
		}
		leave.mutate(boardId);
	};

	return (
		<div className="flex flex-col w-full gap-2 py-2 border-b-1 border-divider">
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
			<div className="flex flex-row gap-4">
				<Popover shouldFlip offset={0} shadow="lg" radius="sm">
					<PopoverTrigger>
						<Button
							isDisabled={!canUpdate || addAdmin.isPending || removeAdmin.isPending}
							variant="ghost"
							color={isMemberAdmin ? 'warning' : 'default'}
							size="sm"
							className="w-20"
						>
							{t('roles.user_admin')}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-2">
						<Button variant="ghost" color="default" size="md" radius="sm" onPress={adminToggle}>
							{t(isMemberAdmin ? 'roles.remove_admin' : 'roles.add_admin')}
						</Button>
					</PopoverContent>
				</Popover>

				<Popover shouldFlip offset={0} shadow="lg" radius="sm">
					<PopoverTrigger>
						<Button
							isDisabled={
								(!canUpdate && !isCurrentUser) || removeMember.isPending || leave.isPending
							}
							variant="ghost"
							color="danger"
							size="sm"
							className="w-20"
						>
							{isCurrentUser ? t('common.leave') : t('common.remove')}
						</Button>
					</PopoverTrigger>

					<PopoverContent className="p-2">
						<Button
							variant="ghost"
							color="danger"
							size="md"
							radius="sm"
							onPress={isCurrentUser ? leaveBoard : remove}
						>
							{isCurrentUser ? t('board.leave_board') : t('board.remove_member')}
						</Button>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};
