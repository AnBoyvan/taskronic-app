import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Roboto } from 'next/font/google';

import { Toaster } from 'sonner';

import { APP_NAME, SITE_DESCRIPTION } from '@/constants/seo.constants';
import '@/styles/globals.css';

import favicon from '../../public/images/favicon.ico';
import openGraphImage from '../../public/images/opengraph-image.png';
import { Providers } from './providers';

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ''),
	icons: {
		icon: favicon.src,
	},
	title: {
		default: APP_NAME,
		template: `%s | ${APP_NAME}`,
	},
	description: SITE_DESCRIPTION,
	twitter: {
		card: 'summary_large_image',
	},
	openGraph: {
		title: {
			default: APP_NAME,
			template: `%s | ${APP_NAME}`,
		},
		images: [
			{
				url: openGraphImage.src,
			},
		],
		description: SITE_DESCRIPTION,
		type: 'website',
		url: process.env.NEXT_PUBLIC_BASE_URL,
		siteName: APP_NAME,
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} className={roboto.className} suppressHydrationWarning>
			<body>
				<NextIntlClientProvider messages={messages}>
					<Providers>
						{children}
						<Toaster
							position="top-right"
							expand={true}
							richColors={true}
							closeButton={false}
							duration={1500}
							visibleToasts={3}
						/>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
