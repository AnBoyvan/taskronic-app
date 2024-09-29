import { create } from 'zustand';

export type BoardMenuSection =
	| 'main'
	| 'activity'
	| 'comments'
	| 'archive'
	| 'info'
	| 'members'
	| 'addMembers'
	| 'background'
	| 'settings'
	| 'close'
	| 'reopen'
	| 'delete'
	| 'leave';

interface BoardMenuStore {
	isOpen: boolean;
	section: BoardMenuSection;

	onOpen: (section: BoardMenuSection) => void;
	onClose: () => void;
}

export const useBoardMenu = create<BoardMenuStore>(set => ({
	isOpen: false,
	section: 'main',
	onOpen: section => set({ section, isOpen: true }),
	onClose: () => set({ isOpen: false, section: 'main' }),
}));
