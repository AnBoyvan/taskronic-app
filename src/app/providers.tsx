import { ThemeProvider } from 'next-themes';

import type { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

import { AuthProvider } from '@/providers/AuthProvider';

export function Providers({ children }: PropsWithChildren) {
	return (
		<ThemeProvider attribute="class" storageKey="theme" disableTransitionOnChange>
			<NextUIProvider>
				<AuthProvider>{children}</AuthProvider>
			</NextUIProvider>
		</ThemeProvider>
	);
}
