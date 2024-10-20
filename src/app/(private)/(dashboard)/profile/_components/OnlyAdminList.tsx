import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Board } from '@/types/board.interface';
import { Workspace } from '@/types/workspace.interface';

import { OnlyAdminBoards } from './OnlyAdminBoards';
import { OnlyAdminWorkspaces } from './OnlyAdminWorkspace';

type OnlyAdminListProps = {
	data: {
		workspaces: Workspace[];
		boards: Board[];
	};
};

export const OnlyAdminList: React.FC<OnlyAdminListProps> = ({ data }) => {
	const t = useTranslations();

	const [workspacesList, setWorkspacesList] = useState<Workspace[]>([]);
	const [boardsList, setBoardsList] = useState<Board[]>([]);

	const onWorkspaceAdminAdd = (workspaceId: string) => {
		setWorkspacesList(workspacesList.filter(workspace => workspace._id !== workspaceId));
	};

	const onBoardAdminAdd = (boardId: string) => {
		setBoardsList(boardsList.filter(board => board._id !== boardId));
	};

	useEffect(() => {
		setWorkspacesList(data.workspaces);
		setBoardsList(data.boards);
	}, [data]);

	return (
		<div className="flex flex-col w-full gap-4">
			{workspacesList.length > 0 && (
				<OnlyAdminWorkspaces workspaces={workspacesList} onAddAdmin={onWorkspaceAdminAdd} />
			)}
			{boardsList.length > 0 && (
				<OnlyAdminBoards boards={boardsList} onAddAdmin={onBoardAdminAdd} />
			)}
		</div>
	);
};
