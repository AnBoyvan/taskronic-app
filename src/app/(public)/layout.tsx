import { PublicHeader } from './_components/PublicHeader';

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<PublicHeader />
			<main className="flex h-[calc(100%_-_64px)] flex-col items-center justify-center bg-gradient-to-b from-primary-400 to-primary-100">
				{children}
			</main>
		</>
	);
}
