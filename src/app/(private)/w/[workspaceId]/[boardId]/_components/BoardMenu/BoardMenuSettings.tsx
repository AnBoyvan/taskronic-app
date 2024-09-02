'use client';

import { useTranslations } from 'next-intl';

import { Divider, Switch } from '@nextui-org/react';

import { VisibilitySwitcher } from '@/components/ui/VisibilitySwitcer';
import { boardSettings } from '@/configs/board-settings.config';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';
import { Board, BoardSettings } from '@/types/board.interface';

type BoardMenuSettingsProps = {
	board: Board;
	canUpdate: boolean;
};

export const BoardMenuSettings: React.FC<BoardMenuSettingsProps> = ({ board, canUpdate }) => {
	const t = useTranslations();
	const { updGeneral, updSettings } = useBoardsEdit();

	const { _id, settings, private: isPrivate } = board;

	const changeVisibility = (value: boolean) => {
		updGeneral.mutate({
			boardId: _id,
			data: {
				private: value,
			},
		});
	};

	const changeSettings = (option: keyof BoardSettings) => {
		updSettings.mutate({
			boardId: _id,
			data: {
				...settings,
				[option]: !settings[option],
			},
		});
	};

	return (
		<div className="flex flex-col">
			<div className="h-10 flex items-center justify-center font-medium">
				{t('common.settings')}
			</div>
			<Divider className="my-2" />
			<div className="flex flex-col gap-4">
				<VisibilitySwitcher
					classNames={{
						label: 'text-tiny top-2/3',
					}}
					isDisabled={!canUpdate}
					current={isPrivate}
					setCurrent={value => changeVisibility(value)}
				/>
				{boardSettings.map(({ value, label }) => (
					<div key={value} className="flex flex-row gap-4 justify-between items-center">
						<p className="text-tiny">{t(label)}</p>
						<Switch
							size="sm"
							color="success"
							isSelected={settings[value]}
							isDisabled={!canUpdate || updSettings.isPending}
							onValueChange={() => changeSettings(value)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
