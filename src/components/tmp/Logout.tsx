'use client';

import { Button } from '@nextui-org/react';

import { logout } from '@/actions/logout';

export const Logout: React.FC = () => {
	const handleLogout = () => {
		logout();
	};

	return (
		<Button color="danger" variant="flat" onClick={handleLogout}>
			<span>Вихід</span>
		</Button>
	);
};
