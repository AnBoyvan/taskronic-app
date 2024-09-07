import { Board, BoardTaskField, List } from '@/types/board.interface';
import { TaskBoardField } from '@/types/tasks.interface';

import { useLists } from './useLists';
import { useTasksEdit } from './useTasksEdit';

type Reorder = <T>(arr: T[], startIndex: number, endIndex: number) => T[];

type ListsReorder = (sourceIndex: number, destIndex: number) => List[];

type TasksReorder = (
	sourceId: string,
	sourceIndex: number,
	destId: string,
	destIndex: number,
) => TaskBoardField[];

type MoveTasksToList = (sourceId: string, destId: string) => TaskBoardField[];

export const useReorder = (board: Board | BoardTaskField) => {
	const { updListsOrder } = useLists();
	const { updOrder } = useTasksEdit();

	const reorder: Reorder = (arr, startIndex, endIndex) => {
		const result = Array.from(arr);

		const [removed] = result.splice(startIndex, 1);

		result.splice(endIndex, 0, removed);

		return result;
	};

	const listsReorder: ListsReorder = (sourceIndex, destIndex) => {
		const reorderedLists = reorder(board.lists, sourceIndex, destIndex).map((list, index) => ({
			...list,
			order: index,
		}));

		updListsOrder.mutate({ boardId: board._id, data: reorderedLists });

		return reorderedLists;
	};

	const tasksReorder: TasksReorder = (sourceId, sourceIndex, destId, destIndex) => {
		if (!board.workspace) {
			return board.tasks;
		}
		const sourceTasks = board.tasks.filter(task => task.list === sourceId);
		const destinationTasks = board.tasks.filter(task => task.list === destId);
		const remainingTasks = board.tasks.filter(
			task => task.list !== sourceId && task.list !== destId,
		);

		let updatedTasks;

		if (destId === sourceId) {
			const reorderedTasks = reorder(sourceTasks, sourceIndex, destIndex);
			reorderedTasks.forEach((task, idx) => (task.order = idx));
			updatedTasks = [...reorderedTasks];
		} else {
			const [movedTask] = sourceTasks.splice(sourceIndex, 1);
			movedTask.list = destId;
			destinationTasks.splice(destIndex, 0, movedTask);

			sourceTasks.forEach((task, idx) => (task.order = idx));
			destinationTasks.forEach((task, idx) => (task.order = idx));

			updatedTasks = [...sourceTasks, ...destinationTasks];
		}

		const updTasksData = updatedTasks.map(({ _id, list, order }) => ({
			taskId: _id,
			order,
			list,
		}));

		updOrder.mutate({
			workspaceId: board.workspace,
			boardId: board._id,
			data: updTasksData,
		});

		return [...remainingTasks, ...updatedTasks];
	};

	const moveTasksToList: MoveTasksToList = (sourceId, destId) => {
		if (!board.workspace) {
			return board.tasks;
		}

		const tasksToMove = board.tasks.filter(task => task.list === sourceId);
		const remainingTasks = board.tasks.filter(task => task.list !== sourceId);
		const destList = board.tasks.filter(task => task.list === destId);

		const movedTasks = tasksToMove.map(task => {
			return {
				...task,
				list: destId,
				order: task.order + destList.length,
			};
		});

		const updTasksData = movedTasks.map(({ _id, list, order }) => ({
			taskId: _id,
			order,
			list,
		}));

		updOrder.mutate({
			workspaceId: board.workspace,
			boardId: board._id,
			data: updTasksData,
		});

		return [...remainingTasks, ...movedTasks];
	};

	return { listsReorder, tasksReorder, moveTasksToList };
};
