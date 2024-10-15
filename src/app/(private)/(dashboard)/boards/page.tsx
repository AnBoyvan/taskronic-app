import { auth } from '@/auth';
import { PageContainer } from '@/components/layout/PageContainer';
import { boardService } from '@/services/board.service';
import { Board } from '@/types/board.interface';
import { boardCategorizer } from '@/utils/helpers/boardCategorizer';
import { fetcher } from '@/utils/helpers/fetcher';

import { ClosedBoards } from './_components/ClosedBoards';
import { GuestWorkspaces } from './_components/GuestWorkspaces';
import { StarredBoards } from './_components/StarredBoards';
import { UserWorkspacesBoards } from './_components/UserWorkspacesBoards';

export default async function UserBoardsPage() {
	const session = await auth();
	const { data } = await fetcher<Board[]>(boardService.findByUser());

	if (!session || !session.user.sub) {
		return null;
	}

	const {
		userWorkspacesBoards,
		starredBoards,
		guestureWorkspacesBoards,
		closedBoards,
		userWorkspaces,
	} = boardCategorizer(data || [], session.user.sub);

	return (
		<PageContainer scroll className="gap-8">
			<StarredBoards starredBoards={starredBoards} userBoards={data || []} />
			<UserWorkspacesBoards workspaces={userWorkspaces} boards={userWorkspacesBoards} />
			<GuestWorkspaces boards={guestureWorkspacesBoards} />
			<ClosedBoards boards={closedBoards} />
		</PageContainer>
	);
}
