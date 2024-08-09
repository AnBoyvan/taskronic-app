import { useQuery } from '@tanstack/react-query';

import { workspaceService } from '@/services/workspace.service';

export const useFetchWorkspaces = () => {
	return useQuery({
		queryKey: ['workspaces'],
		queryFn: workspaceService.findAll,
		staleTime: 1000 * 60,
	});
};
