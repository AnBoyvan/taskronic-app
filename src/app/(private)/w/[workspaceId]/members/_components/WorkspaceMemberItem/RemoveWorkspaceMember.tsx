'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';

type RemoveWorkspaceMemberProps = {
	userId: string;
	userName: string;
	workspaceId: string;
	isCurrentUserAmin: boolean;
	currentUserId: string;
};

export const RemoveWorkspaceMember: React.FC<RemoveWorkspaceMemberProps> = ({
	userId,
	userName,
	workspaceId,
	isCurrentUserAmin,
	currentUserId,
}) => {
	const t = useTranslations();
	const { removeMember, leave } = useWorkspaceMembers();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const isCurrentUser = userId === currentUserId;

	const remove = async () => {
		const dto = { _id: userId, name: userName };

		await removeMember({ workspaceId, dto });

		setIsOpen(false);
	};

	const leaveWorkspace = async () => {
		await leave(workspaceId);

		setIsOpen(false);
	};

	return (
		<Popover
			shouldFlip
			offset={0}
			shadow="lg"
			radius="sm"
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
		>
			<PopoverTrigger>
				<Button
					isDisabled={!isCurrentUserAmin && !isCurrentUser}
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
					onPress={isCurrentUser ? leaveWorkspace : remove}
				>
					{isCurrentUser ? t('workspace.leave_ws') : t('workspace.remove_member')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
