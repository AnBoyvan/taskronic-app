'use client';

import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';
import { useCurrentUser } from '@/hooks/useCurrentUser';

type StarredSwitcherProps = {
	boardStarred: string[];
	boardId: string;
};

export const StarredSwitcher: React.FC<StarredSwitcherProps> = ({ boardStarred, boardId }) => {
	const { user } = useCurrentUser();
	const { starred } = useBoardsEdit();

	const [isStarred, setIsStarred] = useState<boolean>(false);

	const starredToggle = async () => {
		await starred.mutate(boardId);
		setIsStarred(!isStarred);
	};

	useEffect(() => {
		const liked = Boolean(user && boardStarred.includes(user.sub));
		setIsStarred(liked);
	}, [boardStarred]);

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
