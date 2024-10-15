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
import { useMemberActivityModal } from '@/hooks/useMemberActivityModal';
import { useUser } from '@/hooks/useUser';
import { Member } from '@/types/root.interface';

interface BoardMemberItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	member: Member;
	boardId: string;
	isMemberAdmin: boolean;
	onAction?: () => void;
}

export const BoardMemberItem: React.FC<BoardMemberItemProps> = ({
	member,
	boardId,
	className,
	isMemberAdmin,
	onAction,
}) => {
	const t = useTranslations();
	const { add } = useContacts();
	const user = useUser();
	const { onOpen } = useMemberActivityModal();

	const { _id, name, email, initials, avatar } = member;

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openActivityModal = () => {
		setIsOpen(false);
		onOpen(member, boardId);
		if (onAction) {
			onAction();
		}
	};

	const addToContacts = () => {
		if (add.isPending) {
			return;
		}
		add.mutate(member);
	};

	const disabled = user.contacts.some(i => i._id === _id) || _id === user._id;

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
						avatarColor={avatar}
						avatarName={initials}
						isAdmin={isMemberAdmin}
						className="hover:opacity-70 cursor-pointer transition-opacity"
					/>
				</PopoverTrigger>
				<PopoverContent>
					<User
						name={name}
						description={email}
						avatarProps={{
							name: initials,
							classNames: {
								base: `${colorVariants[avatar]}`,
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
