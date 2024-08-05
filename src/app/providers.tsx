import { ThemeProvider } from 'next-themes';

import type { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

import { QueryProvider } from '@/components/providers/QueryProvider';

export function Providers({ children }: PropsWithChildren) {
	return (
		<QueryProvider>
			<ThemeProvider attribute="class" storageKey="theme" disableTransitionOnChange>
				<NextUIProvider>{children}</NextUIProvider>
			</ThemeProvider>
		</QueryProvider>
	);
}
