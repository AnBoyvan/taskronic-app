import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Select, SelectItem, SharedSelection } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { BoardView, boardViewConfig } from '@/configs/board-view.config';
import { useBoardState } from '@/hooks/useBoardState';

type BoardViewSwitcherProps = {
	boardId: string;
};

export const BoardViewSwitcher: React.FC<BoardViewSwitcherProps> = ({ boardId }) => {
	const t = useTranslations();
	const { view, changeView } = useBoardState(boardId);

	const [currentView, setCurrentView] = useState<BoardView>(BoardView.board);

	const handleChangeView = (keys: SharedSelection) => {
		const selected = Array.from(keys).join(', ');
		if (Object.values(BoardView).includes(selected as BoardView)) {
			changeView(selected as BoardView);
		}
	};

	useEffect(() => {
		setCurrentView(view);
	}, [view]);

	const currentOption = boardViewConfig.find(({ value }) => value === currentView);

	return (
		<Select
			aria-label={t('common.view')}
			disallowEmptySelection
			selectionMode="single"
			variant="flat"
			size="sm"
			fullWidth={false}
			classNames={{
				base: 'flex w-fit ml-2',
				value: 'hidden md:block text-sm',
				innerWrapper: 'w-fit pr-7',
			}}
			popoverProps={{
				className: 'w-fit',
			}}
			selectedKeys={[currentView]}
			startContent={
				currentOption ? (
					<Icon name={currentOption.icon} size={16} className="min-w-4 min-h-4" />
				) : null
			}
			onSelectionChange={key => handleChangeView(key)}
		>
			{boardViewConfig.map(({ value, label, icon }) => (
				<SelectItem
					key={value}
					aria-label={t('sort.by_due')}
					startContent={<Icon name={icon} size={16} />}
					className="w-fit"
				>
					{t(label)}
				</SelectItem>
			))}
		</Select>
	);
};
