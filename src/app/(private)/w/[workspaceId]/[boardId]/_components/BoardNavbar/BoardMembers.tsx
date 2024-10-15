'use client';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Board } from '@/types/board.interface';

import { BoardMemberItem } from './BoardMemberItem';

type BoardMembersProps = {
	board: Board;
};

export const BoardMembers: React.FC<BoardMembersProps> = ({ board }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { _id, members, admins } = board;

	const membersList = members.length > 3 ? members.slice(0, 3) : members;

	return (
		<div className="flex flex-row items-center pl-2">
			{membersList.map(member => (
				<BoardMemberItem
					key={member._id}
					member={member}
					isMemberAdmin={admins.includes(member._id)}
					boardId={_id}
					className="-ml-1"
					onAction={() => setIsOpen(false)}
				/>
			))}
			{members.length > 3 && (
				<Popover
					placement="bottom"
					offset={0}
					isOpen={isOpen}
					onOpenChange={open => setIsOpen(open)}
				>
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
							<BoardMemberItem
								key={member._id}
								boardId={_id}
								member={member}
								isMemberAdmin={admins.includes(member._id)}
								onAction={() => setIsOpen(false)}
							/>
						))}
					</PopoverContent>
				</Popover>
			)}
		</div>
	);
};
