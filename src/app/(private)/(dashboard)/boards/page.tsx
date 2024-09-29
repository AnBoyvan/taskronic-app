import { auth } from '@/auth';
import { boardService } from '@/services/board.service';
import { Board } from '@/types/board.interface';
import { boardCategorizer } from '@/utils/helpers/boardCategorizer';
import { fetcher } from '@/utils/helpers/fetcher';

export default async function UserBoardsPage() {
	const session = await auth();
	const { data } = await fetcher<Board[]>(boardService.findByUser());

	if (!session || !session.user) {
		return null;
	}

	const {
		userWorkspacesBoards,
		starredBoards,
		guestureWorkspacesBoards,
		closedBoards,
		userWorkspaces,
	} = boardCategorizer(data || [], session.user.sub);

	return <div className="w-full overflow-hidden">UserBoardsPage</div>;
}
