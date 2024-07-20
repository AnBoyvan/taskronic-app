'use client';

import { ThemeProvider } from 'next-themes';

import { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: PropsWithChildren) {
	return (
		<ThemeProvider attribute="class" storageKey="theme" disableTransitionOnChange>
			<NextUIProvider>{children}</NextUIProvider>
		</ThemeProvider>
	);
}
