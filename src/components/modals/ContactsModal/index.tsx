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
		queryFn: () => userService.findContacts(),
		enabled: isOpen,
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
		<Modal size="sm" isOpen={isOpen} onOpenChange={onClose} placement="center" backdrop="blur">
			<ModalContent className="flex-col justify-start p-4 gap-2 h-[500px] ">
				<ModalHeader className="flex-col justify-center p-0 gap-2">
					<p className="text-center">{t('account.contacts')}</p>
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
				</ModalHeader>
				<ModalBody className="p-0 flex-grow justify-start bg-transparent  overflow-y-auto">
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
