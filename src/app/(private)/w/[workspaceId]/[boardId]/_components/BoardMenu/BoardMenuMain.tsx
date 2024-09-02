'use client';

import { useTranslations } from 'next-intl';

import { Divider, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { boardMenu } from '@/configs/board-menu.config';
import { useBoardMenu } from '@/hooks/useBoardMenu';

type BoardMenuMainProps = {
	description?: string;
};

export const BoardMenuMain: React.FC<BoardMenuMainProps> = ({ description }) => {
	const t = useTranslations();
	const { onOpen } = useBoardMenu();

	return (
		<div className="flex flex-col">
			<div className="h-10 flex items-center justify-center font-medium">{t('common.menu')}</div>
			<Divider className="my-2" />
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
							color={section === 'close' ? 'danger' : 'default'}
							className={section === 'close' ? 'text-danger' : ''}
							startContent={<Icon name={icon} size={20} />}
							onPress={() => onOpen(section)}
						/>
					))}
				</ListboxSection>
				<ListboxItem
					key={t('board.leave_board')}
					title={t('board.leave_board')}
					startContent={<Icon name="LogOut" size={20} />}
					color="danger"
					className="text-danger"
					onPress={() => onOpen('leave')}
				/>
			</Listbox>
		</div>
	);
};
