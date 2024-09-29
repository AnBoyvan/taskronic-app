'use client';

import { useEffect, useState } from 'react';

import { ContactsModal } from '@/components/modals/ContactsModal';

import { CreateModal } from '../modals/CreateModal';
import { InviteModal } from '../modals/InviteModal';
import { MemberActivityModal } from '../modals/MemberActivityModal';
import { TaskModal } from '../modals/TaskModal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<ContactsModal />
			<CreateModal />
			<InviteModal />
			<TaskModal />
			<MemberActivityModal />
		</>
	);
};
