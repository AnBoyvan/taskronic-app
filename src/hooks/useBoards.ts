import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { boardService } from '@/services/board.service';

export const useBoards = () => {
	const queryClient = useQueryClient();

	const { mutate: starred } = useMutation({
		mutationFn: (boardtId: string) => boardService.starred(boardtId),
		mutationKey: ['boards-starred'],
		onSuccess: ({ message }) => {
			toast.success(message, { closeButton: false });
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { starred };
};
