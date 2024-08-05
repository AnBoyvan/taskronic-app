import { DashboardSidebar } from './_components/DashboardSidebar';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<DashboardSidebar />
			{children}
		</>
	);
}
