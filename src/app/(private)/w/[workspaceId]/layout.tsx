import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Workspace } from '@/interfaces/workspace.interface';
import { workspaceService } from '@/services/workspace.service';
import { fetcher } from '@/utils/helpers/fetcher';

import { WorkspaceSidebar } from './_components/WorkspaceSidebar';

export default async function WorkspaceLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { workspaceId: string };
}>) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60,
			},
		},
	});

	const { data } = await fetcher<Workspace>(workspaceService.findById(params.workspaceId));

	if (!data) notFound();

	queryClient.setQueryData(['workspaces', params.workspaceId], data);

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<WorkspaceSidebar workspaceId={params.workspaceId} />
				{children}
			</HydrationBoundary>
		</>
	);
}
