import { create } from 'zustand';

type CreateVariant = 'workspace' | 'board' | 'note';

interface CreateModalStore {
	variant?: CreateVariant;
	workspace?: string;
	board?: string;
	isOpen: boolean;
	onOpen: (variant: CreateVariant, workspace?: string, board?: string) => void;
	onClose: () => void;
}

export const useCreateModal = create<CreateModalStore>(set => ({
	variant: undefined,
	isOpen: false,
	onOpen: (variant, workspace, board) => set({ isOpen: true, variant, workspace, board }),
	onClose: () => set({ isOpen: false, variant: undefined, workspace: undefined, board: undefined }),
}));
