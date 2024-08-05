'use client';

import { useEffect, useState } from 'react';

import { ContactsModal } from '@/components/modals/ContactsModal';

export const WorkspacesProvider = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<ContactsModal />
		</>
	);
};
