import * as Yup from 'yup';

import { ColorVariant } from '@/constants/color-variants.constants';
import { WorkspaceIcon } from '@/constants/workspace-icons.constants';
import { WorkspaceCompose } from '@/types/workspace.interface';

export const getWorkspaceComposeSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<WorkspaceCompose> => {
	return Yup.object().shape({
		name: Yup.string().required(messages.title).min(3, messages.title),
		description: Yup.string(),
		avatarIcon: Yup.mixed<WorkspaceIcon>().required(),
		avatarColor: Yup.mixed<ColorVariant>().required(),
	});
};
