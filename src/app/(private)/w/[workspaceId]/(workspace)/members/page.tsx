import { notFound } from 'next/navigation';

import { workspaceService } from '@/services/workspace.service';
import { Workspace } from '@/types/workspace.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { WorkspaceTitle } from '../../_components/WorkspaceTitle';
import { WorkspaceMembers } from './_components/WorkspaceMembers';

export default async function WorkspaceMembersPage({
	params,
}: Readonly<{
	params: { workspaceId: string };
}>) {
	const { data } = await fetcher<Workspace>(workspaceService.findById(params.workspaceId));

	if (!data) return notFound();

	return (
		<div className="w-full overflow-x-hidden">
			<WorkspaceTitle workspace={data} />
			<WorkspaceMembers workspace={data} />
		</div>
	);
}
