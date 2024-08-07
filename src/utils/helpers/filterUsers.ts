import { IMember } from '@/interfaces/root.interface';

export interface Filter {
	search?: string;
	role: 'all' | 'members' | 'admins' | 'guests';
}

interface FilterUser {
	(users: IMember[], admins: string[], members: string[], filter: Filter): IMember[];
}

export const filterUsers: FilterUser = (users, admins, members, { search, role }) => {
	let filtered: IMember[] = users;

	if (search) {
		filtered = filtered.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
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
