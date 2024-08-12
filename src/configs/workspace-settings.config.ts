import { WorkspaceSettings } from '@/types/workspace.interface';

export const workspaceSettings: { value: keyof WorkspaceSettings; label: TranslationKeys }[] = [
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
