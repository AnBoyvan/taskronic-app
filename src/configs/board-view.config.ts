import { IconName } from '@/components/ui/Icon';

export enum BoardView {
	board = 'board',
	table = 'table',
	dashboard = 'dashboard',
	grid = 'grid',
}

export type BoardViewOption = {
	value: BoardView;
	label: TranslationKeys;
	icon: IconName;
};

export const boardViewConfig: BoardViewOption[] = [
	{
		value: BoardView.board,
		label: 'common.board',
		icon: 'Kanban',
	},
	{
		value: BoardView.table,
		label: 'common.table',
		icon: 'TableProperties',
	},
	{
		value: BoardView.grid,
		label: 'common.grid',
		icon: 'LayoutGrid',
	},
	{
		value: BoardView.dashboard,
		label: 'common.dashboard',
		icon: 'ChartNoAxesCombined',
	},
];
