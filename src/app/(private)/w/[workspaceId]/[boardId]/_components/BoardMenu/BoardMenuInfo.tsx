'use client';

import { useTranslations } from 'next-intl';

import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Textarea } from '@nextui-org/react';

import { FormInput } from '@/components/ui/FormInput';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';
import { useValidation } from '@/hooks/useValidation';
import { Board, BoardCompose } from '@/types/board.interface';

type BoardMenuInfoProps = {
	board: Board;
	canUpdate: boolean;
};

export const BoardMenuInfo: React.FC<BoardMenuInfoProps> = ({ board, canUpdate }) => {
	const t = useTranslations();
	const { updGeneral } = useBoardsEdit();
	const { boardComposeSchema } = useValidation();

	const { _id, title, description } = board;

	const {
		register,
		control,
		handleSubmit,
		formState: { isDirty, isValid },
	} = useForm<BoardCompose>({
		mode: 'onChange',
		defaultValues: {
			title,
			description,
		},
		resolver: yupResolver(boardComposeSchema),
	});

	const onSubmit: SubmitHandler<BoardCompose> = data => {
		updGeneral.mutate({ boardId: _id, data });
	};

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="min-h-10 h-10 flex items-center justify-center font-medium">
				{t('common.info')}
			</div>
			<Divider className="my-2" />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-4 overflow-y-auto"
			>
				<FormInput
					isReadOnly={!canUpdate || updGeneral.isPending}
					control={control}
					variant="bordered"
					name="title"
					label={t('label.title')}
				/>
				<Textarea
					isReadOnly={!canUpdate || updGeneral.isPending}
					{...register('description')}
					label={t('label.description')}
					variant="bordered"
					labelPlacement="outside"
					placeholder={t('placeholder.board_descr')}
				/>
				<Button
					isDisabled={updGeneral.isPending || !isDirty || !isValid}
					fullWidth={true}
					color={!isDirty || !isValid ? 'default' : 'primary'}
					variant="solid"
					type="submit"
					isLoading={updGeneral.isPending}
					spinnerPlacement="end"
					className="min-h-10"
				>
					{t('common.edit')}
				</Button>
			</form>
		</div>
	);
};
