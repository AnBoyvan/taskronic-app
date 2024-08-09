import { useQuery } from '@tanstack/react-query';

import { workspaceService } from '@/services/workspace.service';

export const useFetchCurrentWorkspace = (workspaceId: string) => {
	return useQuery({
		queryKey: ['workspaces', workspaceId],
		queryFn: () => workspaceService.findById(workspaceId),
		staleTime: 1000 * 60,
	});
};
