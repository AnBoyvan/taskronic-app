import { PageContainer } from '@/components/layout/PageContainer';

import { ProfileHeader } from './_components/ProfileHeader';

export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<PageContainer scroll>
			<ProfileHeader />
			{children}
		</PageContainer>
	);
}
