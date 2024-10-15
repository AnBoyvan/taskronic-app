'use client';

import { Divider } from '@nextui-org/react';

import { DashboardSidebarNav } from './DashboardSidebarNav';
import { DashboardSidebarWorkspaces } from './DashboardSidebarWorkspaces';

export const DashboardSidebar: React.FC = () => {
	return (
		<div className="hidden md:flex flex-col min-w-64 w-64 px-4 py-2 border-r border-divider">
			<DashboardSidebarNav />
			<Divider className="my-2" />
			<DashboardSidebarWorkspaces />
		</div>
	);
};
