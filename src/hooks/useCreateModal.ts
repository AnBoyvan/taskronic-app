import { create } from 'zustand';

export type CreateVariant = 'workspace' | 'workspace-edit' | 'board' | 'note';

interface CreateModalStore {
	variant?: CreateVariant;
	isOpen: boolean;
	onOpen: (variant: CreateVariant) => void;
	onClose: () => void;
}

export const useCreateModal = create<CreateModalStore>(set => ({
	variant: undefined,
	isOpen: false,
	onOpen: variant => set({ isOpen: true, variant }),
	onClose: () => set({ isOpen: false, variant: undefined }),
}));
