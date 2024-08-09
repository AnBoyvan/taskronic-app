import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { ModalProvider } from '@/components/providers/ModalProvider';

import { PrivateHeader } from './_components/PrivateHeader';

export default async function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<PrivateHeader />
			<main className="flex flex-row h-[calc(100%_-_48px)]">{children}</main>
			<ModalProvider />
		</SessionProvider>
	);
}
