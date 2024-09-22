'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { Card, CardBody, CardFooter, CardProps, Chip, Tooltip } from '@nextui-org/react';

import { StarredSwitcher } from '@/components/ui/StarredSwitcher';
import { ROUTES } from '@/configs/routes.config';
import { boardColors } from '@/constants/board-colors.constants';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { BoardBasic, Board as BoardType } from '@/types/board.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

interface BoardProps extends Partial<CardProps> {
	board: BoardType | BoardBasic;
}

export const BoardCard: React.FC<BoardProps> = ({ board, ...props }) => {
	const t = useTranslations();
	const router = useRouter();
	const { user } = useCurrentUser();

	const { _id, title, thumbImage, textColor, bgColor, starred, closed, admins, workspace } = board;

	const { isAdmin } = getBoardPermissions(board, user?.sub);

	const goToBoard = () => {
		if (workspace) {
			router.push(`${ROUTES.WORKSPACE}/${workspace._id}/${_id}`);
		}
	};

	const openBoard = () => {
		// TODO:
		console.log('OPEN BOARD');
	};

	return (
		<Card
			as="div"
			shadow="none"
			radius="md"
			isPressable={!closed ? true : !isAdmin}
			isDisabled={closed && !isAdmin}
			onPress={Boolean(closed && isAdmin) ? openBoard : goToBoard}
			{...props}
			style={thumbImage ? { backgroundImage: `url(${thumbImage})` } : undefined}
			classNames={{
				base: clsx(
					`h-28 hover:opacity-80`,
					textColor && `${textColor}`,
					thumbImage && `bg-center bg-cover`,
					bgColor && `${boardColors[bgColor]}`,
				),
				footer: 'flex flex-row items-center justify-between pt-0',
				body: 'text-sm pb-0',
			}}
		>
			<Tooltip
				isDisabled={!closed ? true : isAdmin}
				content={t('board.open_admin')}
				offset={-60}
				className="text-tiny max-w-40"
			>
				<CardBody>
					<span>{title}</span>
				</CardBody>
			</Tooltip>
			<CardFooter>
				<div>
					{closed && (
						<Chip
							size="sm"
							color="danger"
							variant="bordered"
							className="uppercase text-[10px] leading-3"
						>
							{t('common.closed')}
						</Chip>
					)}
				</div>
				<StarredSwitcher boardId={_id} boardStarred={starred} />
			</CardFooter>
		</Card>
	);
};
