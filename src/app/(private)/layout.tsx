import { ModalProvider } from '@/components/providers/ModalProvider';
import { UserProvider } from '@/components/providers/UserProvider';
import { userService } from '@/services/user.service';
import { IUser } from '@/types/user.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { PrivateHeader } from './_components/PrivateHeader';

export default async function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data, error } = await fetcher<IUser>(userService.getCurrent());

	return (
		<>
			<UserProvider user={data} error={error} />
			<PrivateHeader />
			<main className="flex flex-row w-full h-[calc(100%_-_48px)]">{children}</main>
			<ModalProvider />
		</>
	);
}
