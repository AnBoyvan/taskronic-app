import { Logout } from '@/components/tmp/Logout';

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Logout />
			<main>{children}</main>
		</>
	);
}
