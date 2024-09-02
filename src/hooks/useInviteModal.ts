import { create } from 'zustand';

import { Workspace } from '@/types/workspace.interface';

type InviteModalStore = {
	workspace: Workspace | null;
	invitations: string[];
	isOpen: boolean;
	onOpen: (workspace: Workspace, invitations?: string[]) => void;
	onClose: () => void;
	setInvitations: (invitations: string[]) => void;
};

export const useInviteModal = create<InviteModalStore>(set => ({
	workspace: null,
	invitations: [],
	isOpen: false,
	onOpen: (workspace, invitations) =>
		set({ isOpen: true, workspace, invitations: invitations || [] }),
	onClose: () => set({ isOpen: false, workspace: null, invitations: [] }),
	setInvitations: (invitations: string[]) => set({ invitations }),
}));
