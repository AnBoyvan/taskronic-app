'use client';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useInviteModal } from '@/hooks/useInviteModal';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { Member } from '@/types/root.interface';
import { Workspace } from '@/types/workspace.interface';

type ContactInviteProps = {
	contactId: string;
	contactEmail: string;
};

export const ContactInvite: React.FC<ContactInviteProps> = ({ contactId, contactEmail }) => {
	const modal = useInviteModal();
	const { user } = useCurrentUser();
	const { workspaces } = useWorkspacesList();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const isMember = (members: Member[]): boolean => {
		return members.some(({ _id }) => _id === contactId);
	};

	const canInvite = workspaces.filter(
		({ members, admins, settings }) =>
			((user && admins.includes(user?.sub)) || settings.invite) && !isMember(members),
	);

	const inviteContact = (workspace: Workspace) => {
		setIsOpen(false);
		modal.onOpen(workspace, [contactEmail]);
	};
	return (
		<>
			{canInvite.length > 0 && (
				<Popover
					placement="bottom"
					shouldFlip
					isOpen={isOpen}
					onOpenChange={open => setIsOpen(open)}
					offset={0}
				>
					<PopoverTrigger>
						<Button
							size="sm"
							variant="bordered"
							color="primary"
							isIconOnly
							isDisabled={canInvite.length < 1}
						>
							<Icon name="UserPlus" size={16} />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="max-h-80 p-2">
						{canInvite.map(workspace => (
							<Button
								variant="ghost"
								key={workspace._id}
								className="max-w-40 p-1"
								onPress={() => inviteContact(workspace)}
							>
								<WorkspaceBadge
									avatarColor={workspace.avatarColor}
									avatarIcon={workspace.avatarIcon}
									name={workspace.name}
								/>
							</Button>
						))}
					</PopoverContent>
				</Popover>
			)}
		</>
	);
};
