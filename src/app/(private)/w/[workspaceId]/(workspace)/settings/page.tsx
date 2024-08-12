'use client';

import { useTranslations } from 'next-intl';

import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { workspaceSettings } from '@/configs/workspace-settings.config';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';

import { DeleteWorkspace } from './_components/DeleteWorkspace';
import { WorkspaceSettingsItem } from './_components/WorkspaceSettingsItem';

export default function WorkspaceSettingsPage() {
	const t = useTranslations();

	const {
		current,
		permissions: { isAdmin },
	} = useWorkspacesList();

	if (!current) return null;

	return (
		<PageContainer scroll>
			<Section
				title={t('workspace.settings_title')}
				gap={4}
				flexItems="center"
				className="max-w-[800px] mx-auto"
			>
				<p className="text-xs">{t('workspace.settings_desc')}</p>
				<ul className="flex flex-col items-center gap-8 w-full p-8 rounded-2xl border border-divider">
					{workspaceSettings.map(({ value, label }) => (
						<WorkspaceSettingsItem
							key={value}
							label={label}
							isDisabled={!isAdmin}
							value={value}
							settings={current.settings}
							workspaceId={current._id}
						/>
					))}
				</ul>
				{isAdmin && (
					<div className="self-start">
						<DeleteWorkspace workspaceId={current._id} workspaceName={current.name} />
					</div>
				)}
			</Section>
		</PageContainer>
	);
}
