'use client';

import { useTranslations } from 'next-intl';

import { ReactNode, useEffect, useState } from 'react';

import { Button, Input, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { colorVariants } from '@/constants/color-variants.constants';
import { Member } from '@/types/root.interface';

type AddTaskMemberPopoverProps = {
	trigger: ReactNode;
	boardMembers: Member[];
	onMemberAdd: (member: Member) => void;
};

export const AddTaskMemberPopover: React.FC<AddTaskMemberPopoverProps> = ({
	trigger,
	boardMembers,
	onMemberAdd,
}) => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [members, setMembers] = useState<Member[]>(boardMembers);
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		const filtered = boardMembers.filter(
			member =>
				member.name.toLowerCase().includes(search.toLowerCase()) ||
				member.email.toLowerCase().includes(search.toLowerCase()),
		);
		setMembers(filtered);
	}, [boardMembers, search]);

	return (
		<Popover placement="bottom" offset={0} isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent className="p-2 w-80 max-h-96 overflow-hidden">
				<p className="font-medium text-center pt-1">{t('actions.add_members')}</p>
				<Button
					isIconOnly
					variant="light"
					size="sm"
					onPress={() => setIsOpen(false)}
					className="absolute top-2 right-2"
				>
					<Icon name="X" size={16} />
				</Button>
				<Input
					variant="bordered"
					size="md"
					placeholder={t('common.search')}
					startContent={<Icon name="Search" size={16} />}
					type="search"
					value={search}
					onValueChange={setSearch}
					className="mt-3"
				/>
				<p className="font-medium text-tiny mt-3">{t('board.members')}</p>
				<ul className="overflow-auto gap-y-2 w-full">
					{members.map(member => (
						<li
							key={member._id}
							className="flex flex-row gap-4 w-full px-2 py-1 justify-between items-center"
						>
							<User
								name={member.name}
								description={member.email}
								avatarProps={{
									name: member.initials,
									size: 'sm',
									classNames: {
										base: `${colorVariants[member.avatar]}`,
									},
								}}
							/>
							<Button
								isIconOnly
								variant="solid"
								color="primary"
								size="sm"
								onPress={() => onMemberAdd(member)}
							>
								<Icon name="Plus" size={16} />
							</Button>
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	);
};
