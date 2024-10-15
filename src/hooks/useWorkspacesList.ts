// import { create } from 'zustand';

// import { Workspace, WorkspacePermissions } from '@/types/workspace.interface';

// export const defaultWorkspacePermissions = {
// 	isAdmin: false,
// 	invite: false,
// 	update: false,
// 	createBoard: false,
// 	removeMember: false,
// };

// interface CreateModalStore {
// 	workspaces: Workspace[];
// 	current: Workspace | null;
// 	permissions: WorkspacePermissions;
// 	isLoading: boolean;
// 	setWorkspaces: (workspaces: Workspace[]) => void;
// 	setCurrent: (workspaces: Workspace | null, permissions: WorkspacePermissions) => void;
// 	setIsLoading: (isLoading: boolean) => void;
// }

// export const useWorkspacesList = create<CreateModalStore>(set => ({
// 	workspaces: [],
// 	current: null,
// 	permissions: {
// 		isAdmin: false,
// 		invite: false,
// 		update: false,
// 		createBoard: false,
// 		removeMember: false,
// 	},
// 	isLoading: true,
// 	setWorkspaces: workspaces => set({ workspaces, isLoading: false }),
// 	setCurrent: (workspace, permissions) =>
// 		set({ current: workspace, permissions, isLoading: false }),
// 	setIsLoading: isLoading => set({ isLoading }),
// }));
