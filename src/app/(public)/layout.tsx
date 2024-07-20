import { PublicHeader } from '@/components/layout/PublicHeader';

export default async function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<PublicHeader />
			<main>{children}</main>
		</>
	);
}
