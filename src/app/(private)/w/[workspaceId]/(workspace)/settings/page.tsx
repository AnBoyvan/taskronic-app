import { notFound } from 'next/navigation';

import { workspaceService } from '@/services/workspace.service';
import { Workspace } from '@/types/workspace.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { WorkspaceTitle } from '../../_components/WorkspaceTitle';
import { WorkspaceSettings } from './_components/WorkspaceSettings';

export default async function WorkspaceSettingsPage({
	params,
}: Readonly<{
	params: { workspaceId: string };
}>) {
	const { data } = await fetcher<Workspace>(workspaceService.findById(params.workspaceId));

	if (!data) return notFound();

	return (
		<div className="w-full overflow-x-hidden">
			<WorkspaceTitle workspace={data} />
			<WorkspaceSettings workspace={data} />
		</div>
	);
}
