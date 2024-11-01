import { getTranslations } from 'next-intl/server';

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
	const t = await getTranslations();

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
			{data?.length === 0 && (
				<p className="text-center text-divider/50 mt-8">{t('board.no_boards')}</p>
			)}
			{starredBoards.length > 0 && (
				<StarredBoards starredBoards={starredBoards} userBoards={data || []} />
			)}

			<UserWorkspacesBoards workspaces={userWorkspaces} boards={userWorkspacesBoards} />

			{guestureWorkspacesBoards.length > 0 && <GuestWorkspaces boards={guestureWorkspacesBoards} />}

			{closedBoards.length > 0 && <ClosedBoards boards={closedBoards} userId={session.user.sub} />}
		</PageContainer>
	);
}
