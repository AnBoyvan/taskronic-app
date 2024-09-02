'use client';

import clsx from 'clsx';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { Icon } from '@/components/ui/Icon';
import { StarredSwitcher } from '@/components/ui/StarredSwitcher';
import { BoardMenuSection, useBoardMenu } from '@/hooks/useBoardMenu';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { userService } from '@/services/user.service';
import { Board } from '@/types/board.interface';
import { Member } from '@/types/root.interface';

import { BoardMember } from './BoardMember';

type BoardNavbarProps = {
	board: Board;
};

export const BoardNavbar: React.FC<BoardNavbarProps> = ({ board }) => {
	const { user } = useCurrentUser();
	const { onOpen } = useBoardMenu();
	const { _id, title, starred, members, admins, settings } = board;

	const { data } = useQuery<Member[]>({
		queryKey: ['contacts'],
		queryFn: () => userService.findContacts(),
	});

	const openBoardMenu = (section: BoardMenuSection) => {
		onOpen(section);
	};

	const membersList = members.length > 3 ? members.slice(0, 3) : members;

	return (
		<div
			className={clsx(
				'relative w-full h-14 z-[40] bg-background/50 flex justify-between items-center p-2 pl-4 backdrop-blur-md text-foreground',
			)}
		>
			<div className="flex items-center gap-4">
				<p className="truncate">{title}</p>
				<StarredSwitcher boardId={_id} boardStarred={starred} />
			</div>
			<div className="flex items-center gap-2">
				<div className="flex flex-row items-center pl-2">
					{membersList.map(member => (
						<BoardMember
							key={member._id}
							member={member}
							userContacts={data}
							isMemberAdmin={admins.includes(member._id)}
							className="-ml-1"
						/>
					))}
					{members.length > 3 && (
						<Popover placement="bottom" offset={0}>
							<PopoverTrigger>
								<Button
									variant="light"
									size="sm"
									radius="full"
									isIconOnly
									className="-ml-1 text-foreground"
								>
									+{members.length - 3}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="grid grid-cols-6 gap-2 p-2">
								{members.map(member => (
									<BoardMember
										key={member._id}
										member={member}
										userContacts={data}
										isMemberAdmin={admins.includes(member._id)}
									/>
								))}
							</PopoverContent>
						</Popover>
					)}
				</div>
				<Button isIconOnly variant="light" onPress={() => openBoardMenu('main')}>
					<Icon name="Ellipsis" size={20} className="text-foreground" />
				</Button>
			</div>
		</div>
	);
};
