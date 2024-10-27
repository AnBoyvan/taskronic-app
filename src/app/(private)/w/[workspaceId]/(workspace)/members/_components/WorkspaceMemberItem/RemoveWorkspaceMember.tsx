'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { toast } from 'sonner';

import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';

type RemoveWorkspaceMemberProps = {
	userId: string;
	userName: string;
	workspaceId: string;
	isAdmin: boolean;
	currentUserId?: string;
	isOnlyAdmin: boolean;
};

export const RemoveWorkspaceMember: React.FC<RemoveWorkspaceMemberProps> = ({
	userId,
	userName,
	workspaceId,
	isAdmin,
	currentUserId,
	isOnlyAdmin,
}) => {
	const t = useTranslations();
	const { removeMember, leave } = useWorkspaceMembers();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const isCurrentUser = userId === currentUserId;

	const remove = () => {
		const dto = { _id: userId, name: userName };

		if (isOnlyAdmin) {
			toast.error(t('workspace.only_admin'));
			setIsOpen(false);
			return;
		}

		removeMember.mutate({ workspaceId, dto });
		setIsOpen(false);
	};

	const leaveWorkspace = () => {
		if (isOnlyAdmin) {
			toast.error(t('workspace.only_admin'));
			setIsOpen(false);
			return;
		}

		leave.mutate(workspaceId);
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
					isDisabled={!isAdmin && !isCurrentUser}
					variant="ghost"
					color="danger"
					size="sm"
					className="w-20"
				>
					{isCurrentUser ? t('actions.leave') : t('actions.remove')}
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
					{isCurrentUser ? t('workspace.leave') : t('workspace.remove_member')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
