'use client';

import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

import type { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

import { QueryProvider } from '@/components/providers/QueryProvider';

export function Providers({ children }: PropsWithChildren) {
	const router = useRouter();

	return (
		<QueryProvider>
			<ThemeProvider attribute="class" storageKey="theme" disableTransitionOnChange>
				<NextUIProvider navigate={router.push}>{children}</NextUIProvider>
			</ThemeProvider>
		</QueryProvider>
	);
}
