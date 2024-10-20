import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { ChangePassForm } from '@/types/auth.interface';
import { UserUpd } from '@/types/user.interface';
import { getMessageKey } from '@/utils/locale/getMessageKey';

import en from '../../messages/en.json';
import { useUser } from './useUser';

export const useUserEdit = () => {
	const t = useTranslations();
	const { updUser, logout } = useUser();

	const update = useMutation({
		mutationFn: (dto: UserUpd) => userService.updGeneral(dto),
		mutationKey: ['user-update'],
		onSuccess: user => {
			updUser(user);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const changePassword = useMutation({
		mutationFn: (dto: ChangePassForm) => authService.passChange(dto),
		mutationKey: ['user-change-password'],
		onSuccess: ({ message }) => {
			const key = getMessageKey(message, en);
			toast.success(key ? t(key as any) : message, { closeButton: false });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const removeAccount = useMutation({
		mutationFn: () => userService.deleteAccount(),
		mutationKey: ['user-remove'],
		onSuccess: () => {
			signOut();
			logout();
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { update, changePassword, removeAccount };
};
