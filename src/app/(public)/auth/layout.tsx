import { PageContainer } from '@/components/layout/PageContainer';

import { Brand } from './_components/Brand';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<PageContainer
			scroll
			className="w-full max-w-[1000px] flex flex-col md:flex-row gap-4 items-center p-4"
		>
			<Brand />
			{children}
		</PageContainer>
	);
}
