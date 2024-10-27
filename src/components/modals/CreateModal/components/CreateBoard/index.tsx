'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/react';

import { WorkspaceSwitcher } from '@/components/shared/WorkspaceSwitcher';
import { FormInput } from '@/components/ui/FormInput';
import { VisibilitySwitcher } from '@/components/ui/VisibilitySwitcer';
import { ROUTES } from '@/configs/routes.config';
import { BoardColor } from '@/constants/board-colors.constants';
import { useBoardsEdit } from '@/hooks/useBoardsEdit';
import { useCreateModal } from '@/hooks/useCreateModal';
import { useUser } from '@/hooks/useUser';
import { useValidation } from '@/hooks/useValidation';
import { BoardCompose } from '@/types/board.interface';

import { NewBoardBackground } from './NewBoardBackground';

type CreateBoardModalProps = {
	workspaceId?: string;
};

export const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ workspaceId }) => {
	const t = useTranslations();
	const router = useRouter();
	const params = useParams<{ workspaceId: string }>();
	const { workspaces } = useUser();
	const { onClose } = useCreateModal();
	const { boardComposeSchema } = useValidation();
	const { create } = useBoardsEdit();

	const current = workspaces.find(({ _id }) => _id === params.workspaceId);

	const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(
		workspaceId || current?._id,
	);

	const {
		watch,
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isValid },
		setValue,
	} = useForm<BoardCompose>({
		mode: 'onChange',
		defaultValues: {
			title: '',
			description: '',
			bgColor: undefined,
			thumbImage: undefined,
			bgImage: undefined,
			textColor: undefined,
			private: false,
		},
		resolver: yupResolver(boardComposeSchema),
	});

	const onSubmit: SubmitHandler<BoardCompose> = async data => {
		if (selectedWorkspace) {
			await create.mutate({
				workspaceId: selectedWorkspace,
				data,
			});
		}
	};

	useEffect(() => {
		if (create.isSuccess) {
			reset();
			onClose();
			const { _id } = create.data;
			router.push(`${ROUTES.WORKSPACE}/${selectedWorkspace}/${_id}`);
		}
	}, [create.isSuccess]);

	return (
		<form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
			<NewBoardBackground
				setColor={(color?: BoardColor, textColor?: string) => {
					setValue('bgColor', color);
					setValue('textColor', textColor);
				}}
				setImg={(thumbImage?: string, bgImage?: string, textColor?: string) => {
					setValue('thumbImage', thumbImage);
					setValue('bgImage', bgImage);
					setValue('textColor', textColor);
				}}
			/>
			<FormInput
				control={control}
				variant="bordered"
				name="title"
				label={t('common.title')}
				placeholder={t('board.new')}
				isRequired
				classNames={{
					label: 'text-tiny top-2/3',
				}}
				isDisabled={create.isPending}
			/>
			<WorkspaceSwitcher
				variant="bordered"
				isRequired
				classNames={{
					base: 'text-sm',
					label: 'text-tiny top-2/3',
				}}
				mediumText
				canCreateBoard
				onWorkspaceChange={workspaceId => setSelectedWorkspace(workspaceId)}
			/>
			<VisibilitySwitcher
				isRequired
				classNames={{
					label: 'text-tiny top-2/3',
				}}
				current={watch('private')}
				setCurrent={value => setValue('private', value)}
			/>
			<Button
				isDisabled={create.isPending || !isDirty || !isValid || !selectedWorkspace}
				fullWidth={true}
				color={!isDirty || !isValid || !selectedWorkspace ? 'default' : 'primary'}
				variant="solid"
				radius="sm"
				type="submit"
				isLoading={create.isPending}
				spinnerPlacement="end"
				className="mt-2"
			>
				{t('actions.create')}
			</Button>
		</form>
	);
};
