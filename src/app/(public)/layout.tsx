import { PublicHeader } from '@/components/layout/PublicHeader';

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<main>
				<PublicHeader />
				{children}
			</main>
		</>
	);
}
