import { create } from 'zustand';

type ContactsModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useContactsModal = create<ContactsModalStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
