'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import clsx from 'clsx';
import { ElementRef, useEffect, useRef, useState } from 'react';

import { Button, Input } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { boardColors } from '@/constants/board-colors.constants';
import { boardService } from '@/services/board.service';
import { Board } from '@/types/board.interface';

export const SearchBar = () => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const [boards, setBoards] = useState<Board[]>([]);

	const { data } = useQuery<Board[]>({
		queryKey: ['boards'],
		queryFn: boardService.findByUser,
		enabled: isOpen,
	});

	const inputRef = useRef<ElementRef<'input'>>(null);
	const wrapperRef = useRef<ElementRef<'div'>>(null);

	const disableSearching = () => {
		setIsOpen(false);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableSearching();
		}
	};

	useEventListener('keydown', onKeyDown);
	useOnClickOutside(wrapperRef, disableSearching);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				inputRef.current?.focus();
			});
		}
	}, [isOpen]);

	useEffect(() => {
		if (data && search.length > 0) {
			const openBoards = data.filter(board => !board.closed);

			setBoards(
				openBoards.filter(board => board.title.toLowerCase().includes(search.toLowerCase())),
			);
		}

		if (!Boolean(search)) {
			setBoards([]);
		}
	}, [data, search]);

	return (
		<>
			{isOpen ? (
				<div
					ref={wrapperRef}
					className="absolute w-full md:max-w-xl top-1 right-1/2 translate-x-1/2 md:translate-x-0 md:right-[132px] z-50 px-2"
				>
					<Input
						ref={inputRef}
						variant="bordered"
						size="sm"
						placeholder={t('placeholder.search')}
						startContent={<Icon name="Search" size={16} />}
						type="search"
						value={search}
						onValueChange={setSearch}
						classNames={{
							base: 'bg-content1',
						}}
					/>
					{search.length > 0 && (
						<div className="flex flex-col w-full mt-2 max-h-[400px] overflow-hidden bg-content1 border border-divider rounded-md shadow-md gap-1">
							{boards.length > 0 ? (
								<>
									{boards.map(board => (
										<Link
											key={board._id}
											href={`${ROUTES.WORKSPACE}/${board.workspace?._id}/${board._id}`}
											className="w-full flex flex-row justify-start items-center gap-1 bg-transparent hover:bg-default/40 transition-colors py-1 px-2"
										>
											<div
												style={
													board.thumbImage
														? { backgroundImage: `url(${board.thumbImage})` }
														: undefined
												}
												className={clsx(
													'h-8 w-10 min-h-8 min-w-10 rounded-md shadow-sm bg-cover',
													board.bgColor && `${boardColors[board.bgColor]}`,
												)}
											/>
											<div className="flex flex-col gap-1 w-full overflow-hidden items-start justify-center">
												<span className="text-start text-xs truncate w-full">{board.title}</span>
												<span className="text-start text-[10px] leading-3 truncate w-full">
													{board.workspace?.name}
												</span>
											</div>
										</Link>
									))}
								</>
							) : (
								<p className="w-full text-center p-3 text-default-500">
									{t('workspace.no_boards')}
								</p>
							)}
						</div>
					)}
				</div>
			) : (
				<>
					<Button
						isIconOnly
						size="sm"
						radius="full"
						variant="light"
						color="default"
						className="text-foreground flex md:hidden"
						onPress={() => setIsOpen(true)}
					>
						<Icon name="Search" size={20} />
					</Button>
					<Button
						size="sm"
						radius="sm"
						variant="light"
						color="default"
						className="text-sm text-foreground hidden md:flex border border-divider w-40 justify-start cursor-text"
						startContent={<Icon name="Search" size={16} />}
						onPress={() => setIsOpen(true)}
					>
						{t('placeholder.search')}
					</Button>
				</>
			)}
		</>
	);
};
