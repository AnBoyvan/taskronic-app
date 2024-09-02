'use client';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { Icon } from '@/components/ui/Icon';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { inviteService } from '@/services/invite.service';
import { Invite } from '@/types/workspace.interface';

import { InviteNotification } from './InviteNotification';
import { JoinRequestNotification } from './JoinRequestNotification';

export const Notifications = () => {
	const { user } = useCurrentUser();
	const { workspaces } = useWorkspacesList();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { data } = useQuery<Invite[]>({
		queryKey: ['invites'],
		queryFn: async () => await inviteService.findByEmail(user?.email!),
		enabled: user ? true : false,
	});

	const withRequests = workspaces
		.filter(({ admins }) => admins.includes(user?.sub!))
		.filter(({ requests }) => requests.length > 0);

	const joinRequests = withRequests.flatMap(({ _id, name, requests }) => {
		return requests.map(req => ({
			user: req,
			workspaceName: name,
			workspaceId: _id,
		}));
	});

	const notifications = Boolean(data && data.length > 0) || Boolean(withRequests.length > 0);

	useEffect(() => {
		if (!notifications && isOpen) {
			setIsOpen(false);
		}
	}, [isOpen, notifications]);

	return (
		<Popover
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			shouldFlip
			placement="bottom"
			offset={0}
			shadow="lg"
			radius="sm"
		>
			<PopoverTrigger>
				<Button
					color={notifications ? 'success' : 'default'}
					isIconOnly
					size="sm"
					variant="light"
					radius="full"
					isDisabled={!notifications}
				>
					<Icon name={notifications ? 'BellRing' : 'Bell'} size={notifications ? 20 : 16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 max-h-[400px] overflow-hidden justify-start">
				<div className="flex flex-col p-4 overflow-auto">
					{data && data.map(invite => <InviteNotification key={invite._id} invite={invite} />)}
					{joinRequests &&
						joinRequests.map(({ user, workspaceId, workspaceName }, idx) => (
							<JoinRequestNotification
								key={idx}
								user={user}
								workspaceId={workspaceId}
								workspaceName={workspaceName}
							/>
						))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
