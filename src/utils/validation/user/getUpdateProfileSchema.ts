import * as Yup from 'yup';

import { ColorVariant } from '@/constants/color-variants.constants';
import { UserUpd } from '@/types/user.interface';

export const getUpdateProfileSchema = (
	messages: IntlMessages['validation'],
): Yup.ObjectSchema<UserUpd> => {
	return Yup.object().shape({
		name: Yup.string().required(messages.name),

		avatar: Yup.mixed<ColorVariant>(),

		bio: Yup.string(),

		noteGroups: Yup.array().of(Yup.string().defined()),
	});
};
