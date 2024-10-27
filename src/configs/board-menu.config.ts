import { IconName } from '@/components/ui/Icon';
import { BoardMenuSection } from '@/hooks/useBoardMenu';

type BoardMenuItem = {
	label: TranslationKeys;
	section: BoardMenuSection;
	icon: IconName;
};

type BoardMenuConfig = {
	first: BoardMenuItem[];
	second: BoardMenuItem[];
};

export const boardMenu: BoardMenuConfig = {
	first: [
		{
			label: 'common.activity',
			section: 'activity',
			icon: 'Activity',
		},
		{
			label: 'common.comments',
			section: 'comments',
			icon: 'MessageSquareText',
		},
		{
			label: 'common.archive',
			section: 'archive',
			icon: 'Archive',
		},
	],
	second: [
		{
			label: 'common.info',
			section: 'info',
			icon: 'Info',
		},
		{
			label: 'board.change_background',
			section: 'background',
			icon: 'Image',
		},
		{
			label: 'common.members',
			section: 'members',
			icon: 'Users',
		},
		{
			label: 'common.settings',
			section: 'settings',
			icon: 'Settings',
		},
		{
			label: 'board.close',
			section: 'close',
			icon: 'MonitorX',
		},
		{
			label: 'board.reopen',
			section: 'reopen',
			icon: 'ExternalLink',
		},
		{
			label: 'board.delete',
			section: 'delete',
			icon: 'Trash2',
		},
	],
};
