import { Member } from '@/types/root.interface';

export type UsersFilter = {
	search?: string;
	role: 'all' | 'members' | 'admins' | 'guests';
};

interface FilterUser {
	(users: Member[], admins: string[], members: string[], filter: UsersFilter): Member[];
}

export const filterUsers: FilterUser = (users, admins, members, { search, role }) => {
	let filtered: Member[] = users;

	if (search) {
		filtered = filtered.filter(
			m =>
				m.name.toLowerCase().includes(search.toLowerCase()) ||
				m.email.toLowerCase().includes(search.toLowerCase()),
		);
	}

	if (role === 'members') {
		filtered = filtered.filter(m => members.includes(m._id));
	}

	if (role === 'admins') {
		filtered = filtered.filter(m => admins.includes(m._id));
	}

	if (role === 'guests') {
		filtered = filtered.filter(m => !members.includes(m._id));
	}

	return filtered;
};
