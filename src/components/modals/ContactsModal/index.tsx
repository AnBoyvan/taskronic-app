import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Card, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { useContactsModal } from '@/hooks/useContactsModal';
import { IMember } from '@/interfaces/root.interface';
import { userService } from '@/services/user.service';

import { Contact } from './Contact';
import { ContactsSkeleton } from './ContactsSkeleton';

export const ContactsModal: React.FC = () => {
	const t = useTranslations();
	const { isOpen, onClose } = useContactsModal(state => ({
		isOpen: state.isOpen,
		onClose: state.onClose,
	}));

	const [contacts, setContacts] = useState<IMember[]>();

	const { data, isFetching } = useQuery<IMember[]>({
		queryKey: ['contacts'],
		queryFn: async () => await userService.findContacts(),
		enabled: true,
	});

	useEffect(() => {
		if (isOpen && data) {
			setContacts(data);
		}
	}, [isOpen, data]);

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
			<ModalContent className="justify-center p-4 gap-4 min-h-[svh_/_2]">
				<ModalHeader className="justify-center p-0">{t('account.contacts')}</ModalHeader>
				<ModalBody className="p-0">
					{contacts ? (
						contacts.map(contact => <Contact key={contact._id} contact={contact} />)
					) : isFetching ? (
						<ContactsSkeleton />
					) : (
						<Card className="justify-center p-4 gap-4">{t('account.no_contacts')}</Card>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
