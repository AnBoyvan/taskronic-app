import { notFound } from 'next/navigation';

import { workspaceService } from '@/services/workspace.service';
import { Workspace } from '@/types/workspace.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { WorkspaceTitle } from './_components/WorkspaceTitle';

export async function generateMetadata({ params }: { params: { workspaceId: string } }) {
	const { data } = await fetcher<Workspace>(workspaceService.findById(params.workspaceId));

	if (!data) return notFound();

	return {
		title: data?.name,
	};
}

export default async function WorkspaceInnerLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full overflow-x-hidden">
			<WorkspaceTitle />
			{children}
		</div>
	);
}
