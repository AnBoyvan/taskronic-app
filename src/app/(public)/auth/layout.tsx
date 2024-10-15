import { Brand } from './_components/Brand';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="w-full max-w-[1000px] flex flex-col md:flex-row gap-4 items-center p-4 overflow-y-auto">
			<Brand />
			{children}
		</section>
	);
}
