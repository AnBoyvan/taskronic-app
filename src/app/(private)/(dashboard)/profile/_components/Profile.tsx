'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Textarea } from '@nextui-org/react';

import { FormInput } from '@/components/ui/FormInput';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { ColorVariant, colorVariants } from '@/constants/color-variants.constants';
import { useUser } from '@/hooks/useUser';
import { useUserEdit } from '@/hooks/useUserEdit';
import { useValidation } from '@/hooks/useValidation';
import { UserUpd } from '@/types/user.interface';

export const Profile = () => {
	const t = useTranslations();
	const { updateProfileSchema } = useValidation();
	const { update } = useUserEdit();
	const user = useUser();

	const {
		register,
		watch,
		control,
		handleSubmit,
		setValue,
		formState: { isDirty, isValid },
	} = useForm<UserUpd>({
		mode: 'all',
		defaultValues: {
			name: undefined,
			avatar: undefined,
			bio: undefined,
		},
		resolver: yupResolver(updateProfileSchema),
	});

	const onSubmit: SubmitHandler<UserUpd> = data => {
		update.mutate(data);
	};

	useEffect(() => {
		setValue('name', user.name);
		setValue('avatar', user.avatar);
		setValue('bio', user.bio);
	}, [user.avatar, user.name, user.bio]);

	const colors = Object.keys(colorVariants) as ColorVariant[];

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-md flex flex-col gap-4 mx-auto py-4 lg:py-8"
		>
			<FormInput
				isReadOnly={update.isPending}
				control={control}
				variant="bordered"
				labelPlacement="outside"
				name="name"
				label={t('common.name')}
			/>
			<Textarea
				isReadOnly={update.isPending}
				{...register('bio')}
				label={t('user.bio')}
				variant="bordered"
				labelPlacement="outside"
				placeholder=" "
				radius="sm"
			/>
			<div className="flex flex-col gap-1">
				<div className="text-sm">{t('user.avatar')}</div>
				<div className="grid grid-cols-[repeat(auto-fill,40px)] gap-2">
					{colors.map(color => (
						<Button
							size="md"
							variant="light"
							color="primary"
							radius="full"
							key={color}
							isIconOnly={update.isPending}
							isDisabled={color === watch('avatar')}
							className={clsx(
								'min-w-10 min-h-10 p-0 items-center justify-center',
								color === watch('avatar') && 'border border-success',
							)}
							onPress={() => {
								setValue('avatar', color, { shouldDirty: true, shouldValidate: true });
							}}
						>
							<UserAvatar avatarColor={color} avatarName={user.initials} size="sm" />
						</Button>
					))}
				</div>
			</div>
			<Button
				isDisabled={update.isPending || !isDirty || !isValid}
				fullWidth={true}
				color={!isDirty || !isValid ? 'default' : 'primary'}
				variant="solid"
				radius="sm"
				type="submit"
				isLoading={update.isPending}
				spinnerPlacement="end"
				className="min-h-10"
			>
				{t('actions.save')}
			</Button>
		</form>
	);
};
