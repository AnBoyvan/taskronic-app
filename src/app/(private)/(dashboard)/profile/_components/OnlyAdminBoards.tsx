import { useTranslations } from 'next-intl';
import Link from 'next/link';

import clsx from 'clsx';

import { Accordion, AccordionItem } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { boardColors } from '@/constants/board-colors.constants';
import { Board } from '@/types/board.interface';

import { OnlyAdminItemMembers } from './OnlyAdminItemMembers';

type OnlyAdminBoardsProps = {
	boards: Board[];
	onAddAdmin: (workspaceId: string) => void;
};

export const OnlyAdminBoards: React.FC<OnlyAdminBoardsProps> = ({ boards, onAddAdmin }) => {
	const t = useTranslations();

	return (
		<div className="flex flex-col w-full">
			<p>{t('common.boards')}:</p>
			<Accordion
				itemClasses={{
					content: 'p-0',
					trigger: 'px-0 py-2',
					titleWrapper: 'overflow-hidden',
					title: 'flex flex-row gap-4 w-full',
				}}
			>
				{boards.map(board => (
					<AccordionItem
						key={board._id}
						textValue={board.title}
						title={
							<>
								<div
									style={
										board.thumbImage ? { backgroundImage: `url(${board.thumbImage})` } : undefined
									}
									className={clsx(
										'h-8 w-10 min-h-8 min-w-10 rounded-md shadow-sm bg-cover',
										board.bgColor && `${boardColors[board.bgColor]}`,
									)}
								/>
								<div className="flex flex-col gap-1 w-full overflow-hidden items-start justify-center">
									<span className="text-start text-xs truncate w-full">{board.title}</span>
									{board.workspace && (
										<span className="text-start text-[10px] leading-3 truncate w-full">
											{board.workspace.name}
										</span>
									)}
								</div>
								{board.workspace && (
									<Link
										href={`${ROUTES.WORKSPACE}/${board.workspace._id}/${board._id}`}
										className="h-8 w-8 flex items-center justify-center text-foreground transition-colors hover:text-primary"
									>
										<Icon name="ExternalLink" size={20} />
									</Link>
								)}
							</>
						}
					>
						<OnlyAdminItemMembers
							id={board._id}
							entity="board"
							members={board.members}
							onAddAdmin={onAddAdmin}
						/>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};
