import { useTranslations } from 'next-intl';

import { Button, Divider, Link } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import { Member } from '@/types/root.interface';

type JoinRequestNotificationProps = {
	user: Member;
	workspaceName: string;
	workspaceId: string;
};

export const JoinRequestNotification: React.FC<JoinRequestNotificationProps> = ({
	user,
	workspaceName,
	workspaceId,
}) => {
	const t = useTranslations();
	const { acceptRequest, declineRequest } = useWorkspaceMembers();
	const { _id, name } = user;

	return (
		<div className="flex flex-col text-sm py-2 gap-2">
			<div className="inline break-words">
				<span className="font-medium">{name}</span>
				&nbsp;{t('workspace.request_notification')}&nbsp;
				<Link
					href={`${ROUTES.WORKSPACE}/${workspaceId}`}
					color="foreground"
					underline="hover"
					className="font-medium text-sm"
				>
					{workspaceName}
				</Link>
			</div>
			<div className="flex flex-row gap-4">
				<Button
					size="sm"
					variant="solid"
					color="success"
					startContent={<Icon name="Check" size={12} />}
					onPress={() => acceptRequest.mutate({ workspaceId, userId: _id })}
					isDisabled={acceptRequest.isPending || declineRequest.isPending}
				>
					{t('actions.accept')}
				</Button>
				<Button
					size="sm"
					variant="bordered"
					color="danger"
					startContent={<Icon name="X" size={12} />}
					onPress={() => declineRequest.mutate({ workspaceId, userId: _id })}
					isDisabled={acceptRequest.isPending || declineRequest.isPending}
				>
					{t('actions.decline')}
				</Button>
			</div>
			<Divider />
		</div>
	);
};
