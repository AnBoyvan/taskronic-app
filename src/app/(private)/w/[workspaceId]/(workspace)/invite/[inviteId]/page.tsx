import { inviteService } from '@/services/invite.service';
import { Invite } from '@/types/workspace.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { WorkspaceInvite } from './WorkspaceInvite';

export default async function WorkspaceInvitePage({
	params,
}: Readonly<{
	params: { inviteId: string };
}>) {
	const { data: invite, error: inviteError } = await fetcher<Invite>(
		inviteService.findById(params.inviteId),
	);

	return (
		<div className="w-full overflow-hidden">
			<WorkspaceInvite invite={invite} error={inviteError} />
		</div>
	);
}
