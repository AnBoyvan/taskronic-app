import { Brand } from './_components/Brand';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="w-full max-w-[1000px] m-4 flex flex-col md:flex-row gap-4 items-center">
			<Brand />
			{children}
		</section>
	);
}
