import { create } from 'zustand';

import { ColorVariant } from '@/constants/color-variants.constants';
import { Board, BoardBasic } from '@/types/board.interface';
import { Member } from '@/types/root.interface';
import { IUser, UserUpd } from '@/types/user.interface';
import { Workspace } from '@/types/workspace.interface';

interface UserStore extends IUser {
	isLoading: boolean;
	isLoggedIn: boolean;
	setUser: (user: IUser) => void;
	updUser: (data: UserUpd) => void;
	logout: () => void;
	addUserContact: (data: Member) => void;
	removeUserContact: (contactId: string) => void;
	updWorkspace: (data: Workspace) => void;
	addWorkspace: (data: Workspace) => void;
	removeWorkspace: (workspaceId: string) => void;
	addStarred: (data: Board | BoardBasic) => void;
	removeStarred: (boardId: string) => void;
}

const defaultUserStore = {
	_id: '',
	name: '',
	email: '',
	initials: '',
	avatar: 'lime' as ColorVariant,
	bio: '',
	contacts: [],
	workspaces: [],
	starred: [],
	isLoading: true,
	isLoggedIn: false,
};

export const useUser = create<UserStore>()((set, get) => ({
	...defaultUserStore,
	setUser: user => {
		set({ ...user, isLoading: false, isLoggedIn: true });
	},
	updUser: data => set({ ...get(), ...data }),
	logout: () => set({ ...defaultUserStore }),
	addUserContact: data => set({ contacts: [...get().contacts, data] }),
	removeUserContact: contactId =>
		set({
			contacts: get().contacts.filter(({ _id }) => _id !== contactId),
		}),
	updWorkspace: data => {
		const currentWorkspaces = get().workspaces;
		const newWorkspaces = currentWorkspaces.map(workspace =>
			workspace._id === data._id ? data : workspace,
		);
		set({
			workspaces: newWorkspaces,
		});
	},
	addWorkspace: data => set({ workspaces: [...get().workspaces, data] }),
	removeWorkspace: workspaceId =>
		set({ workspaces: get().workspaces.filter(({ _id }) => _id !== workspaceId) }),
	addStarred: data => set({ starred: [...get().starred, data as BoardBasic] }),
	removeStarred: (boardId: string) =>
		set({ starred: get().starred.filter(({ _id }) => _id !== boardId) }),
}));
