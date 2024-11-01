'use client';

import { InfoMenu } from './InfoMenu';

export const InfoSidebar: React.FC = () => {
	return (
		<div className="hidden md:flex flex-col min-w-64 w-64 px-4 py-2 border-r border-divider overflow-y-auto">
			<InfoMenu />
		</div>
	);
};
