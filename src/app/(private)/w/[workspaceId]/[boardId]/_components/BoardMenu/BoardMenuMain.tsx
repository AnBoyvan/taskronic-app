'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Divider, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { boardMenu } from '@/configs/board-menu.config';
import { useBoardMenu } from '@/hooks/useBoardMenu';

type BoardMenuMainProps = {
	description?: string;
	isClosed: boolean;
};

export const BoardMenuMain: React.FC<BoardMenuMainProps> = ({ description, isClosed }) => {
	const t = useTranslations();
	const { onOpen } = useBoardMenu();

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('common.menu')}
			</div>
			<Divider className="my-2" />
			<div className="flex flex-col overflow-y-auto">
				{description && (
					<>
						<p className="text-sm">{description}</p>
						<Divider className="my-2" />
					</>
				)}

				<Listbox aria-label="board menu" className="p-0">
					<ListboxSection
						showDivider
						classNames={{
							group: 'flex flex-col gap-2',
							divider: 'm-0',
						}}
					>
						{boardMenu.first.map(({ label, section, icon }) => (
							<ListboxItem
								key={section}
								title={t(label)}
								startContent={<Icon name={icon} size={20} />}
								onPress={() => onOpen(section)}
							/>
						))}
					</ListboxSection>
					<ListboxSection
						showDivider
						classNames={{
							group: 'flex flex-col gap-2',
							divider: 'm-0',
						}}
					>
						{boardMenu.second.map(({ label, section, icon }) => (
							<ListboxItem
								key={section}
								title={t(label)}
								color={
									section === 'close' || section === 'delete'
										? 'danger'
										: section === 'reopen'
											? 'success'
											: 'default'
								}
								className={clsx(
									section === 'close' ? (isClosed ? 'hidden' : 'text-danger') : '',
									section === 'reopen' ? (isClosed ? 'text-success' : 'hidden') : '',
									section === 'delete' ? (isClosed ? 'text-danger' : 'hidden') : '',
								)}
								startContent={<Icon name={icon} size={20} />}
								onPress={() => onOpen(section)}
							/>
						))}
					</ListboxSection>
					<ListboxItem
						key={t('board.leave')}
						title={t('board.leave')}
						startContent={<Icon name="LogOut" size={20} />}
						color="danger"
						className="text-danger"
						onPress={() => onOpen('leave')}
					/>
				</Listbox>
			</div>
		</div>
	);
};
