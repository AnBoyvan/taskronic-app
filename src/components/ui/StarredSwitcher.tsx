'use client';

import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';
import { useUser } from '@/hooks/useUser';
import { Board, BoardBasic } from '@/types/board.interface';

type StarredSwitcherProps = {
	board: Board | BoardBasic;
};

export const StarredSwitcher: React.FC<StarredSwitcherProps> = ({ board }) => {
	const user = useUser();
	const { starred } = useBoardsEdit();

	const [isStarred, setIsStarred] = useState<boolean>(
		user.starred.some(({ _id }) => _id === board._id),
	);

	const starredToggle = async () => {
		await starred.mutate(board._id);
		if (isStarred) {
			user.removeStarred(board._id);
		}
		if (!isStarred) {
			user.addStarred(board);
		}
		setIsStarred(!isStarred);
	};

	useEffect(() => {
		const liked = user.starred.some(({ _id }) => _id === board._id);
		setIsStarred(liked);
	}, [user]);

	return (
		<Button
			color="success"
			radius="full"
			isIconOnly
			variant="light"
			size="sm"
			onClick={starredToggle}
		>
			<Icon
				name="Star"
				size={16}
				fill={isStarred ? '#f5a524' : 'transparent'}
				className="text-yellow-500"
			/>
		</Button>
	);
};
