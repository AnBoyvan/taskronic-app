'use client';

import { useParams } from 'next/navigation';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { toast } from 'sonner';

import { defaultWorkspacePermissions, useWorkspacesList } from '@/hooks/useWorkspacesList';
import { workspaceService } from '@/services/workspace.service';
import { IUser } from '@/types/user.interface';
import { Workspace } from '@/types/workspace.interface';

type WorkspaceProviderProps = {
	initial?: Workspace[];
	user?: IUser;
};

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ initial, user }) => {
	const { workspaceId } = useParams<{ workspaceId: string }>();
	const { current, setIsLoading, setWorkspaces, setCurrent } = useWorkspacesList();

	const { data, isFetching, error } = useQuery({
		queryKey: ['workspaces'],
		queryFn: workspaceService.findAll,
		initialData: initial,
		staleTime: 1000 * 60,
	});

	useEffect(() => {
		if (error) {
			toast.error(error.message, { closeButton: false });
		}
	}, [error]);

	useEffect(() => {
		setIsLoading(isFetching);

		if (data && !isFetching) {
			setWorkspaces(data);
		}

		if (current && !workspaceId) {
			setCurrent(null, defaultWorkspacePermissions);
		}
	}, [data, isFetching, workspaceId, user, setIsLoading, setWorkspaces, setCurrent, current]);

	return null;
};
