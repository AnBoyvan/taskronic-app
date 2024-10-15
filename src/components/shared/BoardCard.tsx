'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { Card, CardBody, CardFooter, CardProps, Chip, Tooltip } from '@nextui-org/react';

import { toast } from 'sonner';

import { StarredSwitcher } from '@/components/ui/StarredSwitcher';
import { ROUTES } from '@/configs/routes.config';
import { boardColors } from '@/constants/board-colors.constants';
import { useUser } from '@/hooks/useUser';
import { BoardBasic, Board as BoardType } from '@/types/board.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

interface BoardProps extends Partial<CardProps> {
	board: BoardType | BoardBasic;
}

export const BoardCard: React.FC<BoardProps> = ({ board, ...props }) => {
	const t = useTranslations();
	const router = useRouter();
	const user = useUser();

	const { _id, title, thumbImage, textColor, bgColor, closed, workspace } = board;

	const { isAdmin } = getBoardPermissions(board, user._id);

	const goToBoard = () => {
		if (closed && !isAdmin) {
			toast.error(t('board.open_admin'), { closeButton: false });
			return;
		}

		if (workspace) {
			router.push(`${ROUTES.WORKSPACE}/${workspace._id}/${_id}`);
		}
	};

	return (
		<Card
			as="div"
			shadow="none"
			radius="md"
			isPressable
			onPress={goToBoard}
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
				<StarredSwitcher board={board} />
			</CardFooter>
		</Card>
	);
};
