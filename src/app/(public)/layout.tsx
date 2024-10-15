import { PublicHeader } from './_components/PublicHeader';

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<PublicHeader />
			<main className="flex flex-grow flex-col items-center justify-center py-auto bg-gradient-to-b from-primary-400 to-primary-100 overflow-hidden">
				{children}
			</main>
		</>
	);
}
