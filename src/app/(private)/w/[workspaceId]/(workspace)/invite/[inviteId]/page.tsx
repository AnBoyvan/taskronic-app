import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { ROUTES } from '@/configs/routes.config';
import { inviteService } from '@/services/invite.service';
import { workspaceService } from '@/services/workspace.service';
import { Invite, Workspace } from '@/types/workspace.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { WorkspaceInvite } from './WorkspaceInvite';

export default async function WorkspaceInvitePage({
	params,
}: Readonly<{
	params: { workspaceId: string; inviteId: string };
}>) {
	const session = await auth();

	const { data: invite, error: inviteError } = await fetcher<Invite>(
		inviteService.findById(params.inviteId),
	);
	const { data } = await fetcher<Workspace>(workspaceService.findById(params.workspaceId));

	const isMember = data?.members.some(({ _id }) => _id === session?.user.sub);

	const isUserInvited = invite?.email === session?.user.email;

	if (isMember || !isUserInvited) {
		redirect(`${ROUTES.WORKSPACE}/${data?._id}`);
	}

	return (
		<div className="w-full overflow-hidden">
			<WorkspaceInvite invite={invite} error={inviteError} />
		</div>
	);
}
