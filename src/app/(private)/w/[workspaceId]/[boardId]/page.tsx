import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import clsx from 'clsx';

import { ENV } from '@/configs/env.config';
import { ROUTES } from '@/configs/routes.config';
import { boardColors } from '@/constants/board-colors.constants';
import { APP_NAME } from '@/constants/seo.constants';
import { boardService } from '@/services/board.service';
import { Board as BoardType } from '@/types/board.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { Board } from './_components/Board';
import { BoardInfo } from './_components/Board/BoardInfo';
import { BoardMenu } from './_components/BoardMenu';
import { BoardNavbar } from './_components/BoardNavbar';

export async function generateMetadata({
	params,
}: {
	params: { boardId: string };
}): Promise<Metadata> {
	const { data } = await fetcher<BoardType>(boardService.findOne(params.boardId));

	if (!data) return {};

	return {
		title: {
			absolute: `${data.title} | ${APP_NAME}`,
		},
		description: data.description || '',
		openGraph: {
			title: data.title,
			description: data.description,
			url: `${ENV.baseUrl}/${ROUTES.WORKSPACE}/${data.workspace}/${data._id}`,
		},
	};
}

export default async function BoardPage({ params }: { params: { boardId: string } }) {
	const { data } = await fetcher<BoardType>(boardService.findOne(params.boardId));

	if (!data) {
		notFound();
	}

	return (
		<div
			style={data.bgImage ? { backgroundImage: `url(${data.bgImage})` } : undefined}
			className={clsx(
				'relative h-full w-full flex flex-col bg-no-repeat bg-cover bg-center overflow-hidden',
				data.bgColor && `${boardColors[data.bgColor]}`,
			)}
		>
			<BoardNavbar board={data} />
			<BoardInfo board={data} />
			<BoardMenu board={data} />
			<Board board={data} />
		</div>
	);
}
