'use client';

import { useTranslations } from 'next-intl';

import { useWorkspacesList } from '@/hooks/useWorkspacesList';

import { WorkspaceListSkeleton } from './WorkspaceListSkeleton';
import { WorkspacesList } from './WorkspacesList';

export const DashboardSidebarWorkspaces = () => {
	const t = useTranslations();
	const { workspaces, isLoading } = useWorkspacesList();

	return (
		<div className="flex flex-col h-full shrink overflow-hidden">
			<span className="text-sm">{t('workspace.ws_list_title')}:</span>
			{isLoading ? (
				<WorkspaceListSkeleton />
			) : (
				<>
					{workspaces.length > 0 ? (
						<WorkspacesList workspaces={workspaces} />
					) : (
						<span className="text-tiny text-center pt-4">{t('workspace.no_workspace')}</span>
					)}
				</>
			)}
		</div>
	);
};
