'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Textarea } from '@nextui-org/react';

import { FormInput } from '@/components/ui/FormInput';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { colorVariants } from '@/constants/color-variants.constants';
import { useCreateModal } from '@/hooks/useCreateModal';
import { useUser } from '@/hooks/useUser';
import { useValidation } from '@/hooks/useValidation';
import { useWorkspaceEdit } from '@/hooks/useWorkspaceEdit';
import { WorkspaceCompose } from '@/types/workspace.interface';

import { ChangeColor } from './ChangeColor';
import { ChangeIcon } from './ChangeIcon';

type CreateWorkspaceModalProps = {
	isEditing?: boolean;
};

export const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({ isEditing }) => {
	const t = useTranslations();
	const router = useRouter();
	const { workspaceId } = useParams<{ workspaceId: string }>();
	const { onClose } = useCreateModal();
	const { workspaces } = useUser();
	const { workspaceComposeSchema } = useValidation();
	const { create, updGeneral } = useWorkspaceEdit();

	const [isEnable, setIsEnable] = useState<boolean>(false);

	const current = workspaces.find(({ _id }) => _id === workspaceId);

	const {
		watch,
		register,
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isValid },
		setValue,
	} = useForm<WorkspaceCompose>({
		mode: 'onChange',
		defaultValues: {
			name: isEditing ? current?.name : '',
			description: isEditing ? current?.description : '',
			avatarIcon: isEditing ? current?.avatarIcon : 'Activity',
			avatarColor: isEditing ? current?.avatarColor : 'teal',
		},
		resolver: yupResolver(workspaceComposeSchema),
	});

	const onSubmit: SubmitHandler<WorkspaceCompose> = data => {
		if (isEditing && current) {
			updGeneral.mutate({ workspaceId: current._id, dto: data });
		}

		if (!isEditing) {
			create.mutate(data);
		}
	};

	useEffect(() => {
		if (create.isSuccess) {
			reset();
			onClose();
			const { _id } = create.data;
			router.push(`${ROUTES.WORKSPACE}/${_id}`);
		}

		if (updGeneral.isSuccess) {
			reset();
			onClose();
		}
	}, [create.isSuccess, updGeneral.isSuccess]);

	useEffect(() => {
		if (create.isPending || updGeneral.isPending) {
			setIsEnable(false);
		}

		if (isDirty) {
			setIsEnable(isValid);
		}

		if (isEditing && isValid) {
			setIsEnable(true);
		}
	}, [create.isPending, isValid, isEditing, updGeneral.isPending]);

	return (
		<form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-row gap-4 items-center">
				<Avatar
					radius="sm"
					icon={<Icon name={watch('avatarIcon')} size={56} />}
					classNames={{
						base: clsx(`${colorVariants[watch('avatarColor')]} w-20 h-20`),
					}}
				/>
				<div className="flex flex-col gap-1 items-center">
					<ChangeColor
						currentColor={watch('avatarColor')}
						currentIcon={watch('avatarIcon')}
						onColorSelect={color => setValue('avatarColor', color)}
					/>
					<ChangeIcon
						currentColor={watch('avatarColor')}
						currentIcon={watch('avatarIcon')}
						onIconSelect={icon => setValue('avatarIcon', icon)}
					/>
				</div>
			</div>
			<FormInput
				control={control}
				variant="bordered"
				name="name"
				label={t('common.title')}
				placeholder={t('workspace.new')}
				isRequired
				classNames={{
					label: 'text-tiny top-2/3',
				}}
				isDisabled={create.isPending || updGeneral.isPending}
			/>
			<Textarea
				{...register('description')}
				label={t('common.description')}
				variant="bordered"
				radius="sm"
				labelPlacement="outside"
				placeholder={t('workspace.descr')}
				classNames={{
					label: 'text-tiny pb-0',
				}}
			/>
			<Button
				isDisabled={!isEnable}
				fullWidth={true}
				color={!isEnable ? 'default' : 'primary'}
				variant="solid"
				radius="sm"
				type="submit"
				isLoading={create.isPending || updGeneral.isPending}
				spinnerPlacement="end"
				className="mt-2"
			>
				{t(isEditing ? 'actions.edit' : 'actions.create')}
			</Button>
		</form>
	);
};
