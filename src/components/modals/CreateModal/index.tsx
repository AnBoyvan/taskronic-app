'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Modal, ModalContent } from '@nextui-org/react';

import { useCreateModal } from '@/hooks/useCreateModal';

import { CreateBoard } from './CreateBoard';
import { CreateWorkspace } from './CreateWorkspace';

export const CreateModal: React.FC = () => {
	const t = useTranslations();
	const { variant, isOpen, onClose } = useCreateModal(state => ({
		variant: state.variant,
		isOpen: state.isOpen,
		onClose: state.onClose,
	}));

	const [search, setSearch] = useState<string>('');

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose} placement="center" closeButton>
			<ModalContent className="flex-col justify-start p-4 gap-4 h-96">
				{variant === 'workspace' && <CreateWorkspace />}
				{variant === 'board' && <CreateBoard />}
			</ModalContent>
		</Modal>
	);
};
