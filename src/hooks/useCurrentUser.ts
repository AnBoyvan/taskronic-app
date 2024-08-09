import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { UserUpd } from '@/interfaces/user.interface';
import { userService } from '@/services/user.service';

export const useCurrentUser = () => {
	const { data, update: updSession } = useSession();
	const t = useTranslations();

	const isLoggedIn = data?.user ? true : false;

	const user = data?.user;

	const update = async (data: UserUpd) => {
		try {
			const res = await userService.updGeneral(data);
			if (res) {
				await updSession(res);
			}
			return { success: t('account.updated') };
		} catch (error: any) {
			return {
				error: error.message,
			};
		}
	};

	return {
		isLoggedIn,
		user,
		update,
	};
};
