import { SessionProvider } from 'next-auth/react';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { auth } from '@/auth';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { workspaceService } from '@/services/workspace.service';

import { PrivateHeader } from './_components/PrivateHeader';

export default async function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();
	const session = await auth();

	await queryClient.prefetchQuery({
		queryKey: ['workspaces'],
		queryFn: workspaceService.findAll,
	});

	return (
		<SessionProvider session={session}>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PrivateHeader />
				<main className="flex flex-row h-full">{children}</main>
				<ModalProvider />
			</HydrationBoundary>
		</SessionProvider>
	);
}
