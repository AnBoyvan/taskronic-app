import { notFound } from 'next/navigation';

import { workspaceService } from '@/services/workspace.service';
import { Workspace } from '@/types/workspace.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { WorkspaceSidebar } from './_components/WorkspaceSidebar';

export async function generateMetadata({ params }: { params: { workspaceId: string } }) {
	const { data } = await fetcher<Workspace>(workspaceService.findById(params.workspaceId));

	if (!data) return notFound();

	return {
		title: data?.name,
	};
}

export default async function WorkspaceLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { workspaceId: string };
}>) {
	return (
		<>
			<WorkspaceSidebar workspaceId={params.workspaceId} />
			{children}
		</>
	);
}
