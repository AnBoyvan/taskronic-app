'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Card, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { Icon } from '@/components/ui/Icon';
import { useContactsModal } from '@/hooks/useContactsModal';
import { userService } from '@/services/user.service';
import { Member } from '@/types/root.interface';

import { Contact } from './Contact';
import { ContactsSkeleton } from './ContactsSkeleton';

export const ContactsModal: React.FC = () => {
	const t = useTranslations();
	const [search, setSearch] = useState<string>('');
	const { isOpen, onClose } = useContactsModal(state => ({
		isOpen: state.isOpen,
		onClose: state.onClose,
	}));

	const [contacts, setContacts] = useState<Member[]>();

	const { data, isFetching } = useQuery<Member[]>({
		queryKey: ['contacts'],
		queryFn: async () => await userService.findContacts(),
		enabled: true,
	});

	const onSearchChange = (value: string) => {
		setSearch(value);
	};

	useEffect(() => {
		if (isOpen && data) {
			setContacts(data);
		}
	}, [isOpen, data]);

	const filtered =
		contacts &&
		contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
			<ModalContent className="flex-col justify-start p-4 gap-4 h-96">
				<ModalHeader className="justify-center p-0">{t('account.contacts')}</ModalHeader>
				<ModalBody className="p-0 flex-grow h-full justify-start">
					<Input
						variant="bordered"
						size="md"
						placeholder={t('placeholder.search')}
						startContent={<Icon name="Search" size={16} />}
						type="search"
						value={search}
						onValueChange={onSearchChange}
						className="max-w-52"
					/>
					{filtered ? (
						filtered.map(contact => <Contact key={contact._id} contact={contact} />)
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
