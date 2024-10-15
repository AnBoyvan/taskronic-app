'use client';

import { useEffect, useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { Icon } from '@/components/ui/Icon';
import { useUser } from '@/hooks/useUser';
import { inviteService } from '@/services/invite.service';
import { Invite, JoinRequest } from '@/types/workspace.interface';

import { InviteNotification } from './InviteNotification';
import { JoinRequestNotification } from './JoinRequestNotification';

export const Notifications = () => {
	const { workspaces, _id, email, isLoggedIn } = useUser();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
	const [invites, setInvites] = useState<Invite[]>([]);

	const { data } = useQuery<Invite[]>({
		queryKey: ['invites'],
		queryFn: async () => await inviteService.findByEmail(email),
		enabled: isLoggedIn,
	});

	useEffect(() => {
		const withRequests = workspaces
			.filter(({ admins }) => admins.includes(_id))
			.filter(({ requests }) => requests.length > 0);

		const requests = withRequests.flatMap(({ _id, name, requests }) => {
			return requests.map(req => ({
				user: req,
				workspaceName: name,
				workspaceId: _id,
			}));
		});

		setJoinRequests(requests);

		if (data) {
			setInvites(data);
		}
	}, [data, workspaces]);

	const hasNotifications = Boolean(joinRequests.length > 0) || Boolean(invites.length > 0);

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
					color={hasNotifications ? 'success' : 'default'}
					isIconOnly
					size="sm"
					variant="light"
					radius="full"
					isDisabled={!hasNotifications}
				>
					<Icon name={hasNotifications ? 'BellRing' : 'Bell'} size={hasNotifications ? 20 : 16} />
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
