'use client';

import { useTranslations } from 'next-intl';

import { useUser } from '@/hooks/useUser';

import { WorkspaceListSkeleton } from './WorkspaceListSkeleton';
import { WorkspacesList } from './WorkspacesList';

export const DashboardSidebarWorkspaces = () => {
	const t = useTranslations();
	const { workspaces, isLoading } = useUser();

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
