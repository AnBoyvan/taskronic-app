import { create } from 'zustand';

import { Member } from '@/types/root.interface';

type MemberActivityModalStore = {
	member?: Member;
	boardId?: string;
	isOpen: boolean;
	onOpen: (user: Member, boardId: string) => void;
	onClose: () => void;
};

export const useMemberActivityModal = create<MemberActivityModalStore>(set => ({
	member: undefined,
	boardId: undefined,
	isOpen: false,
	onOpen: (member, boardId) =>
		set({
			isOpen: true,
			member,
			boardId,
		}),
	onClose: () => set({ isOpen: false, member: undefined, boardId: undefined }),
}));
