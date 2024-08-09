'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useFetchCurrentWorkspace } from '@/hooks/useFetchCurrentWorkspace';
import type { WorkspaceSettings as Settings } from '@/interfaces/workspace.interface';

import { WorkspaceTitle } from '../../../_components/WorkspaceTitle';
import { DeleteWorkspace } from './DeleteWorkspace';
import { WorkspaceSettingsItem } from './WorkspaceSettingsItem';

const permissions: { value: keyof Settings; label: TranslationKeys }[] = [
	{
		value: 'invite',
		label: 'workspace.settings_invite',
	},
	{
		value: 'createBoard',
		label: 'workspace.settings_board',
	},
	{
		value: 'update',
		label: 'workspace.settings_update',
	},
	{
		value: 'removeMember',
		label: 'workspace.settings_remove',
	},
];

export const WorkspaceSettings: React.FC = () => {
	const t = useTranslations();
	const { workspaceId } = useParams<{ workspaceId: string }>();
	const { user } = useCurrentUser();

	const { data: workspace } = useFetchCurrentWorkspace(workspaceId);

	const isDisabled = Boolean(user && !workspace?.admins.includes(user.sub));

	if (!workspace) return null;

	return (
		<div className="flex flex-col items-center">
			<WorkspaceTitle workspace={workspace} />
			<div className="flex flex-col items-center gap-4 p-4 lg:p-8 max-w-[800px] overflow-y-scroll">
				<h2 className="text-center">{t('workspace.settings_title')}</h2>
				<p className="text-xs">{t('workspace.settings_desc')}</p>
				<ul className="flex flex-col items-center gap-8 w-full p-8 rounded-2xl border border-divider">
					{permissions.map(({ value, label }) => (
						<WorkspaceSettingsItem
							key={value}
							label={label}
							isDisabled={isDisabled}
							value={value}
							settings={workspace.settings}
							workspaceId={workspace._id}
						/>
					))}
				</ul>
				{!isDisabled && (
					<div className="self-start">
						<DeleteWorkspace workspaceId={workspace._id} workspaceName={workspace.name} />
					</div>
				)}
			</div>
		</div>
	);
};
