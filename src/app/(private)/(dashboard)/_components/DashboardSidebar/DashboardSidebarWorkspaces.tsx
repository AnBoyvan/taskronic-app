'use client';

import { useTranslations } from 'next-intl';

import { useEffect } from 'react';

import { toast } from 'sonner';

import { useFetchWorkspaces } from '@/hooks/useFetchWorkspaces';

import { WorkspaceListSkeleton } from './WorkspaceListSkeleton';
import { WorkspacesList } from './WorkspacesList';

export const DashboardSidebarWorkspaces = () => {
	const t = useTranslations();

	const { data, isFetching, error } = useFetchWorkspaces();

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	return (
		<div className="flex flex-col h-full shrink overflow-hidden">
			<span className="text-sm">{t('workspace.ws_list_title')}:</span>
			{isFetching && !data ? (
				<WorkspaceListSkeleton />
			) : (
				<>
					{data && data.length > 0 ? (
						<WorkspacesList workspaces={data} />
					) : (
						<span className="text-tiny text-center pt-4">{t('workspace.no_workspace')}</span>
					)}
				</>
			)}
		</div>
	);
};
