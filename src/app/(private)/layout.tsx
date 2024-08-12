import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { WorkspaceProvider } from '@/components/providers/WorkspaceProvider';
import { workspaceService } from '@/services/workspace.service';
import { Workspace } from '@/types/workspace.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { PrivateHeader } from './_components/PrivateHeader';

export default async function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	const { data } = await fetcher<Workspace[]>(workspaceService.findAll());

	return (
		<SessionProvider session={session}>
			<PrivateHeader />
			<main className="flex flex-row h-[calc(100%_-_48px)]">{children}</main>
			<ModalProvider />
			<WorkspaceProvider initial={data} user={session?.user} />
		</SessionProvider>
	);
}
