import Image from 'next/image';

import { InfoHeader } from './_components/InfoHeader';
import { InfoSidebar } from './_components/InfoSidebar';
import lightLogo from '/public/images/logo-light.png';

export default async function InfoLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<InfoHeader />
			<main className="relative flex flex-row w-full max-w-5xl h-[calc(100%_-_64px)] mx-auto">
				<InfoSidebar />
				<div className="relative text-sm leading-normal text-justify whitespace-pre-wrap">
					{children}
					<Image
						src={lightLogo}
						alt="logo"
						fill
						sizes="100vw"
						style={{
							objectFit: 'contain',
							zIndex: -1,
						}}
					/>
				</div>
			</main>
		</>
	);
}
