import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Card, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { colorVariants } from '@/constants/color-variants.constants';
import { useContacts } from '@/hooks/useContacts';
import { Member } from '@/types/root.interface';

type ContactProps = {
	contact: Member;
};

export const Contact: React.FC<ContactProps> = ({ contact }) => {
	const t = useTranslations();
	const { remove } = useContacts();
	const [popoverVisible, setPopoverVisible] = useState<{ [key: string]: boolean }>({});

	const togglePopover = (id: string, visible: boolean) => {
		setPopoverVisible(prevState => ({
			...prevState,
			[id]: visible,
		}));
	};

	return (
		<Card className="flex-row justify-between w-full p-2">
			<User
				name={contact.name}
				description={contact.email}
				avatarProps={{
					size: 'sm',
					name: contact.avatarName,
					classNames: {
						base: `${colorVariants[contact.avatarColor]}`,
					},
				}}
			/>
			<Popover
				placement="bottom"
				isOpen={popoverVisible[contact._id] || false}
				onOpenChange={visible => togglePopover(contact._id, visible)}
			>
				<PopoverTrigger>
					<Button variant="light" color="danger" isIconOnly>
						<Icon name="Trash2" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="gap-2 p-2">
					<p>{t('account.remove_contact')}</p>
					<div className="flex flex-row gap-2">
						<Button variant="bordered" onClick={() => togglePopover(contact._id, false)}>
							{t('common.no')}
						</Button>
						<Button
							variant="solid"
							color="danger"
							onClick={() => {
								remove(contact._id);
								togglePopover(contact._id, false);
							}}
						>
							{t('common.yes')}
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</Card>
	);
};
