import { useTranslations } from 'next-intl';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { userService } from '@/services/user.service';

export const useContacts = () => {
	const queryClient = useQueryClient();
	const t = useTranslations();

	const add = useMutation({
		mutationFn: (contactId: string) => userService.addContact(contactId),
		mutationKey: ['contacts-add'],
		onSuccess: () => {
			toast.success(t('account.contact_added'), { closeButton: false });
			queryClient.refetchQueries({ queryKey: ['contacts'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const remove = useMutation({
		mutationFn: (contactId: string) => userService.removeContact(contactId),
		mutationKey: ['contacts-remove'],
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['contacts'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { add, remove };
};
