'use client';

import { useTranslations } from 'next-intl';

import { ElementRef, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { useEventListener } from 'usehooks-ts';

import { FormInput } from '@/components/ui/FormInput';
import { useLists } from '@/hooks/useLists';
import { useValidation } from '@/hooks/useValidation';
import { BoardPermissions, List } from '@/types/board.interface';

import { ListOptions } from '../ListOptions';

type ListHeaderProps = {
	list: List;
	permissions: BoardPermissions;
	boardId: string;
	boardLists: List[];
	onTaskAdd?: () => void;
	onTasksMove: (sourceList: string, destList: string) => void;
	onListMove: (sourceIndex: number, destIndex: number) => void;
};

export const ListHeader: React.FC<ListHeaderProps> = ({
	list,
	permissions,
	boardId,
	boardLists,
	onTaskAdd,
	onTasksMove,
	onListMove,
}) => {
	const t = useTranslations();
	const { createlistSchema } = useValidation();
	const { updList } = useLists();

	const [title, setTitle] = useState<string>(list.label);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);

	const { control, handleSubmit } = useForm<{ label: string }>({
		mode: 'onBlur',
		defaultValues: {
			label: title,
		},

		resolver: yupResolver(createlistSchema),
	});

	const enableEditing = () => {
		if (!permissions.lists) {
			return;
		}

		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const onBlur = () => {
		handleSubmit(onSubmit)();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			handleSubmit(onSubmit)();
		}
	};

	useEventListener('keydown', onKeyDown);

	const onSubmit: SubmitHandler<{ label: string }> = ({ label }) => {
		if (title === label) {
			return disableEditing();
		}

		updList.mutate({
			boardId,
			data: {
				...list,
				label,
			},
		});

		setTitle(label);
	};

	useEffect(() => {
		if (updList.isSuccess) {
			disableEditing();
		}
	}, [updList.isSuccess]);

	return (
		<div className="pt-2 px-2 rounded-lg flex justify-between items-start gap-x-2">
			{isEditing ? (
				<form ref={formRef} className="w-full" onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						control={control}
						size="sm"
						variant="bordered"
						name="label"
						ref={inputRef}
						placeholder={t('placeholder.list_title')}
						isDisabled={updList.isPending}
						onBlur={onBlur}
					/>
					<button type="submit" hidden />
				</form>
			) : (
				<div
					onClick={enableEditing}
					className={`w-full flex items-center text-sm px-2 py-2 h-8 font-medium border-transparent ${list.textColor} `}
				>
					{title}
				</div>
			)}

			<ListOptions
				list={list}
				boardId={boardId}
				boardLists={boardLists}
				permissions={permissions}
				addTaskOption
				onTaskAdd={onTaskAdd}
				onTasksMove={onTasksMove}
				onListMove={onListMove}
			/>
		</div>
	);
};
