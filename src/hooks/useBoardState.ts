import { useLocalStorage } from 'usehooks-ts';

import { BoardView } from '@/configs/board-view.config';
import { defaultBoardFilter, TasksFilter } from '@/utils/helpers/filterTasks';

export const useBoardState = (boardId: string) => {
	const [state, setState] = useLocalStorage<{
		filter: TasksFilter;
		view: BoardView;
	}>(`board-${boardId}`, {
		filter: defaultBoardFilter,
		view: BoardView.board,
	});

	const changeView = (value: BoardView) => {
		setState({
			...state,
			view: value,
		});
	};

	const changeFilter = (field: keyof TasksFilter, value: any) => {
		setState({
			...state,
			filter: {
				...state.filter,
				[field]: value,
			},
		});
	};

	const resetFilter = () => {
		setState({
			...state,
			filter: defaultBoardFilter,
		});
	};

	return { view: state.view, filter: state.filter, changeView, changeFilter, resetFilter };
};
