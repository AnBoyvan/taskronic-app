import { IconName } from '@/components/ui/Icon';
import { CreateVariant } from '@/hooks/useCreateModal';

type CreateEntity = {
	variant: CreateVariant;
	label: TranslationKeys;
	icon: IconName;
};

export const createButtonConfig: CreateEntity[] = [
	{
		variant: 'board',
		label: 'common.board',
		icon: 'Trello',
	},
	{
		variant: 'workspace',
		label: 'common.workspace',
		icon: 'Network',
	},
];
