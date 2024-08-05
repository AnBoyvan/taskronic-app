import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { userService } from '@/services/user.service';

export const useContacts = () => {
	const queryClient = useQueryClient();

	const { mutate: remove } = useMutation({
		mutationFn: (contactId: string) => userService.removeContact(contactId),
		mutationKey: ['contacts-remove'],
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['contacts'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { remove };
};
