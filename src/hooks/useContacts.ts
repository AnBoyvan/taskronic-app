import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { userService } from '@/services/user.service';
import { Member } from '@/types/root.interface';

import { useUser } from './useUser';

export const useContacts = () => {
	const { addUserContact, removeUserContact } = useUser();
	const t = useTranslations();

	const add = useMutation({
		mutationFn: (data: Member) => userService.addContact(data._id),
		mutationKey: ['contacts-add'],
		onSuccess: (_, data) => {
			toast.success(t('account.contact_added'), { closeButton: false });
			addUserContact(data);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const remove = useMutation({
		mutationFn: (contactId: string) => userService.removeContact(contactId),
		mutationKey: ['contacts-remove'],
		onSuccess: (_, contactId) => {
			removeUserContact(contactId);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { add, remove };
};
