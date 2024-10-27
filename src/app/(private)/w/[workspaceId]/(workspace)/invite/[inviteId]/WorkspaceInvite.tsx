'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { Button } from '@nextui-org/react';

import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import { Invite } from '@/types/workspace.interface';

type WorkspaceInviteProps = {
	invite?: Invite;
	error?: string;
};

export const WorkspaceInvite: React.FC<WorkspaceInviteProps> = ({ invite, error }) => {
	const t = useTranslations();
	const { acceptInvite, rejectInvite } = useWorkspaceMembers();
	const router = useRouter();

	const errorMessage = error ? error : t('workspace.invite_not_found');

	useEffect(() => {
		if (acceptInvite.isSuccess || rejectInvite.isSuccess) {
			if (invite) {
				router.push(`${ROUTES.WORKSPACE}/${invite.workspaceId}`);
			}
		}
	}, [acceptInvite.isSuccess, rejectInvite.isSuccess]);

	return (
		<PageContainer scroll className="flex h-full items-center justify-center">
			{!invite ? (
				<Section className="inline-flex text-danger text-2xl">{errorMessage}</Section>
			) : (
				<Section className="flex-col items-center text-center gap-4 max-w-[600px]">
					<h1 className="text-xl">{t('workspace.invite_title')}</h1>
					<p className="inline break-words">
						<span className="font-medium">{invite.authorName}</span>
						&nbsp;{t('workspace.invite_user')}&nbsp;
						<span className="font-medium">{invite.workspaceName}</span>
					</p>
					{Boolean(invite.invitation) && <p>{invite.invitation}</p>}
					<div className="flex flex-row gap-4">
						<Button
							size="sm"
							variant="solid"
							color="success"
							startContent={<Icon name="Check" size={12} />}
							onPress={() =>
								acceptInvite.mutate({ inviteId: invite._id, workspaceId: invite.workspaceId })
							}
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
							onPress={() =>
								rejectInvite.mutate({ inviteId: invite._id, workspaceId: invite.workspaceId })
							}
							isDisabled={acceptInvite.isPending || rejectInvite.isPending}
							spinnerPlacement="end"
							isLoading={acceptInvite.isPending || rejectInvite.isPending}
						>
							{t('actions.decline')}
						</Button>
					</div>
				</Section>
			)}
		</PageContainer>
	);
};
