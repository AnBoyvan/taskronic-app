'use client';

import { useTranslations } from 'next-intl';

import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { workspaceSettings } from '@/configs/workspace-settings.config';
import { useUser } from '@/hooks/useUser';
import { Workspace } from '@/types/workspace.interface';
import { getWorkspacePermissions } from '@/utils/helpers/getWorkspacePermissions';

import { DeleteWorkspace } from './DeleteWorkspace';
import { WorkspaceSettingsItem } from './WorkspaceSettingsItem';

type WorkspaceSettingsProps = {
	workspace: Workspace;
};

export const WorkspaceSettings: React.FC<WorkspaceSettingsProps> = ({ workspace }) => {
	const t = useTranslations();
	const { _id } = useUser();

	const { isAdmin } = getWorkspacePermissions(workspace, _id);

	return (
		<PageContainer scroll title={t('workspace.settings_title')}>
			<Section noTopMargin className="flex flex-col max-w-[800px] mt-2 items-center gap-4">
				<p className="text-xs">{t('workspace.settings_descr')}</p>
				<ul className="flex flex-col items-center gap-8 w-full p-8 rounded-lg border border-divider">
					{workspaceSettings.map(({ value, label }) => (
						<WorkspaceSettingsItem
							key={value}
							label={label}
							isDisabled={!isAdmin}
							value={value}
							settings={workspace.settings}
							workspaceId={workspace._id}
						/>
					))}
				</ul>
				{isAdmin && (
					<div className="self-start">
						<DeleteWorkspace workspaceId={workspace._id} workspaceName={workspace.name} />
					</div>
				)}
			</Section>
		</PageContainer>
	);
};
