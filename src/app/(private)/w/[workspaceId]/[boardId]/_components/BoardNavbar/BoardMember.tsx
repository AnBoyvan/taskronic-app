'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';

import {
	Divider,
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	User,
} from '@nextui-org/react';

import { UserAvatar } from '@/components/ui/UserAvatar';
import { colorVariants } from '@/constants/color-variants.constants';
import { useContacts } from '@/hooks/useContacts';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Member } from '@/types/root.interface';

interface BoardMembersProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	member: Member;
	userContacts?: Member[];
	isMemberAdmin: boolean;
}

export const BoardMember: React.FC<BoardMembersProps> = ({
	member,
	userContacts,
	className,
	isMemberAdmin,
}) => {
	const t = useTranslations();
	const { add } = useContacts();
	const { user } = useCurrentUser();

	const { _id, name, email, avatarColor, avatarName } = member;

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openActivityModal = () => {
		setIsOpen(false);
		// TODO:
		console.log('OPEN ACTIVITY MODAL');
	};

	const addToContacts = () => {
		if (add.isPending) {
			return;
		}
		add.mutate(_id);
	};

	const disabled = userContacts?.some(i => i._id === _id) || _id === user?.sub;

	return (
		<div className={clsx(className && className)}>
			<Popover
				key={member._id}
				offset={0}
				classNames={{
					content: 'p-2 w-64 flex-col items-start gap-2',
				}}
				isOpen={isOpen}
				onOpenChange={open => setIsOpen(open)}
			>
				<PopoverTrigger>
					<UserAvatar
						size="sm"
						name={name}
						avatarColor={avatarColor}
						avatarName={avatarName}
						isAdmin={isMemberAdmin}
						className="hover:opacity-70 cursor-pointer transition-opacity"
					/>
				</PopoverTrigger>
				<PopoverContent>
					<User
						name={name}
						description={email}
						avatarProps={{
							name: avatarName,
							classNames: {
								base: `${colorVariants[avatarColor]}`,
							},
						}}
					/>
					<Divider />
					<Listbox aria-label={t('common.member')}>
						<ListboxItem key="activity" onPress={openActivityModal}>
							{t('board.view_member_activity')}
						</ListboxItem>
						<ListboxItem
							key="contact"
							onPress={addToContacts}
							className={clsx(disabled && 'hidden')}
						>
							{t('account.add_contact')}
						</ListboxItem>
					</Listbox>
				</PopoverContent>
			</Popover>
		</div>
	);
};
