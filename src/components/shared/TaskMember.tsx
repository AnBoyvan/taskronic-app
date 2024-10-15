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
import { useMemberActivityModal } from '@/hooks/useMemberActivityModal';
import { useTaskMembers } from '@/hooks/useTaskMembers';
import { Member } from '@/types/root.interface';

interface TaskMemberProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	member: Member;
	taskId: string;
	boardId: string;
	canRemove?: boolean;
	isSmall?: boolean;
	size?: 'sm' | 'md' | 'lg';
	onRemove?: (memberId: string) => void;
	onAction?: () => void;
}

export const TaskMember: React.FC<TaskMemberProps> = ({
	member,
	taskId,
	boardId,
	className,
	canRemove,
	isSmall,
	size,
	onRemove,
	onAction,
}) => {
	const t = useTranslations();
	const { removeMember } = useTaskMembers();
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

	const removeTaskMember = () => {
		removeMember.mutate({
			taskId,
			data: {
				_id,
				name,
			},
		});
		if (onRemove) {
			onRemove(_id);
		}
		if (onAction) {
			onAction();
		}
	};

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
						small={isSmall}
						size={size}
						name={name}
						avatarColor={avatar}
						avatarName={initials}
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
							onPress={removeTaskMember}
							className={clsx(!canRemove && 'hidden')}
						>
							{t('task.remove_member')}
						</ListboxItem>
					</Listbox>
				</PopoverContent>
			</Popover>
		</div>
	);
};
