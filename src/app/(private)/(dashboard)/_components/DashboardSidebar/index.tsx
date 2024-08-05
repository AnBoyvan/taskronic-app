'use client';

import { Divider } from '@nextui-org/react';

import { DashboardSidebarNav } from './DashboardSidebarNav';
import { DashboardSidebarWorkspaces } from './DashboardSidebarWorkspaces';

export const DashboardSidebar: React.FC = () => {
	return (
		<div className="hidden md:flex flex-col w-56 px-4 py-2 border-r">
			<DashboardSidebarNav />
			<Divider className="my-2" />
			<DashboardSidebarWorkspaces />
		</div>
	);
};
