'use client';

import { useTranslations } from 'next-intl';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

import { useCreateModal } from '@/hooks/useCreateModal';

import { CreateBoardModal } from './components/CreateBoard';
import { CreateWorkspaceModal } from './components/CreateWorkspace';

export const CreateModal: React.FC = () => {
	const t = useTranslations();
	const { variant, isOpen, onClose } = useCreateModal(state => ({
		variant: state.variant,
		isOpen: state.isOpen,
		onClose: state.onClose,
	}));

	return (
		<Modal
			size="sm"
			isOpen={isOpen}
			onOpenChange={onClose}
			placement="center"
			radius="md"
			closeButton
			backdrop="blur"
		>
			<ModalContent className="flex-col justify-start p-2 gap-4">
				<ModalHeader className="justify-center py-0 px-6 text-center">
					{variant === 'workspace' && t('workspace.new')}
					{variant === 'workspace-edit' && t('workspace.editing')}
					{variant === 'board' && t('board.new')}
				</ModalHeader>
				<ModalBody className="p-0">
					{variant === 'workspace' && <CreateWorkspaceModal />}
					{variant === 'workspace-edit' && <CreateWorkspaceModal isEditing />}
					{variant === 'board' && <CreateBoardModal />}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
