'use client';

import { Button, User } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { colorVariants } from '@/constants/color-variants.constants';
import { useBoardMembers } from '@/hooks/useBoardMembers';
import { Member } from '@/types/root.interface';

type BoardMenuAddMembersItemProps = {
	boardId: string;
	member: Member;
};

export const BoardMenuAddMembersItem: React.FC<BoardMenuAddMembersItemProps> = ({
	boardId,
	member,
}) => {
	const { addMember } = useBoardMembers();

	const { _id, name, email, avatarName, avatarColor } = member;

	const addNewMember = () => {
		addMember.mutate({ boardId, dto: { _id, name } });
	};

	return (
		<div className="flex flex-row justify-between items-center w-full gap-4 py-2 border-b-1 border-divider">
			<User
				name={name}
				description={email}
				className="justify-start"
				avatarProps={{
					name: avatarName,
					classNames: {
						base: `${colorVariants[avatarColor]}`,
					},
				}}
			/>
			<Button
				isIconOnly
				size="sm"
				variant="bordered"
				color="primary"
				onPress={addNewMember}
				isDisabled={addMember.isPending}
			>
				<Icon name="UserPlus" size={20} />
			</Button>
		</div>
	);
};
