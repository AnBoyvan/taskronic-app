import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button, Divider } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import { Invite } from '@/types/workspace.interface';

type InviteNotificationProps = {
	invite: Invite;
};

export const InviteNotification: React.FC<InviteNotificationProps> = ({ invite }) => {
	const t = useTranslations();
	const { acceptInvite, rejectInvite } = useWorkspaceMembers();
	const { _id, authorName, workspaceId, workspaceName } = invite;

	return (
		<div className="flex flex-col text-sm gap-2 py-2">
			<p className="inline break-words">
				<span className="font-medium">{authorName}</span>
				&nbsp;{t('workspace.invite_user')}&nbsp;
				<Link href={`${ROUTES.WORKSPACE}/${workspaceId}`} className="font-medium text-sm">
					{workspaceName}
				</Link>
			</p>
			<div className="flex flex-row gap-4">
				<Button
					size="sm"
					variant="solid"
					color="success"
					startContent={<Icon name="Check" size={12} />}
					onPress={() => acceptInvite.mutate({ inviteId: _id, workspaceId })}
					isDisabled={acceptInvite.isPending || rejectInvite.isPending}
					spinnerPlacement="end"
					isLoading={acceptInvite.isPending || rejectInvite.isPending}
				>
					{t('actions.accept')}
				</Button>
				<Button
					size="sm"
					variant="bordered"
					color="danger"
					startContent={<Icon name="X" size={12} />}
					onPress={() => rejectInvite.mutate({ inviteId: _id, workspaceId })}
					isDisabled={acceptInvite.isPending || rejectInvite.isPending}
					spinnerPlacement="end"
					isLoading={acceptInvite.isPending || rejectInvite.isPending}
				>
					{t('actions.decline')}
				</Button>
			</div>
			<Divider />
		</div>
	);
};
