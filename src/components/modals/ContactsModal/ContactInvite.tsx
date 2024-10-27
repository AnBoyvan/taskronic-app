'use client';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { WorkspaceBadge } from '@/components/ui/WorkspaceBadge';
import { useInviteModal } from '@/hooks/useInviteModal';
import { useUser } from '@/hooks/useUser';
import { Member } from '@/types/root.interface';
import { Workspace } from '@/types/workspace.interface';

type ContactInviteProps = {
	contactId: string;
	contactEmail: string;
};

export const ContactInvite: React.FC<ContactInviteProps> = ({ contactId, contactEmail }) => {
	const modal = useInviteModal();
	const { _id, workspaces } = useUser();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const isMember = (members: Member[]): boolean => {
		return members.some(({ _id }) => _id === contactId);
	};

	const canInvite = workspaces.filter(
		({ members, admins, settings }) =>
			(admins.includes(_id) || settings.invite) && !isMember(members),
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
					radius="md"
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
								variant="light"
								radius="sm"
								fullWidth
								key={workspace._id}
								className="w-52 p-1 justify-start"
								onPress={() => inviteContact(workspace)}
							>
								<WorkspaceBadge
									avatarColor={workspace.avatarColor}
									avatarIcon={workspace.avatarIcon}
									name={workspace.name}
									truncateTitle
								/>
							</Button>
						))}
					</PopoverContent>
				</Popover>
			)}
		</>
	);
};
