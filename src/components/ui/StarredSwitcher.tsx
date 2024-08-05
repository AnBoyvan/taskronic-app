'use client';

import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { useBoards } from '@/hooks/useBoards';
import { useCurrentUser } from '@/hooks/useCurrentUser';

type StarredSwitcherProps = {
	boardStarred: string[];
	boardId: string;
};

export const StarredSwitcher: React.FC<StarredSwitcherProps> = ({ boardStarred, boardId }) => {
	const { user } = useCurrentUser();
	const { starred } = useBoards();

	const [isStarred, setIsStarred] = useState<boolean>(false);

	const starredToggle = async () => {
		await starred(boardId);
		setIsStarred(!isStarred);
	};

	useEffect(() => {
		const liked = Boolean(user && boardStarred.includes(user.sub));
		setIsStarred(liked);
	}, [boardStarred]);

	return (
		<Button color="success" isIconOnly variant="light" size="sm" onClick={starredToggle}>
			<Icon
				name="Star"
				size={16}
				fill={isStarred ? '#f5a524' : 'transparent'}
				className="text-yellow-500"
			/>
		</Button>
	);
};
