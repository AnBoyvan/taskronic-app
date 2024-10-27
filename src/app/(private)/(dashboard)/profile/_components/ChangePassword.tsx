'use client';

import { useTranslations } from 'next-intl';

import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/react';

import { FormInput } from '@/components/ui/FormInput';
import { useUserEdit } from '@/hooks/useUserEdit';
import { useValidation } from '@/hooks/useValidation';
import { ChangePassForm } from '@/types/auth.interface';

export const ChangePassword: React.FC = () => {
	const t = useTranslations();
	const { changePasswordSchema } = useValidation();
	const { changePassword } = useUserEdit();

	const { control, handleSubmit, reset } = useForm<ChangePassForm>({
		mode: 'onBlur',
		defaultValues: {
			password: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		resolver: yupResolver(changePasswordSchema),
	});

	const onSubmit: SubmitHandler<ChangePassForm> = async data => {
		changePassword.mutate(data);
		reset();
	};

	return (
		<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
			<div className="text-start bg-default p-2 w-full rounded">{t('auth.change_pass')}</div>
			<FormInput
				control={control}
				variant="bordered"
				icon="LockKeyhole"
				name="password"
				label={t('common.pass')}
				placeholder={t('auth.placeholder_pass')}
				isRequired
				type="password"
				isDisabled={changePassword.isPending}
			/>
			<FormInput
				control={control}
				variant="bordered"
				icon="LockKeyhole"
				name="newPassword"
				label={t('auth.new_pass')}
				placeholder={t('auth.placeholder_pass')}
				isRequired
				type="password"
				isDisabled={changePassword.isPending}
			/>
			<FormInput
				control={control}
				variant="bordered"
				icon="LockKeyhole"
				name="confirmNewPassword"
				label={t('auth.new_pass_confirm')}
				placeholder={t('auth.placeholder_pass')}
				isRequired
				type="password"
				isDisabled={changePassword.isPending}
			/>
			<Button
				isDisabled={changePassword.isPending}
				color="primary"
				variant="solid"
				radius="sm"
				type="submit"
				isLoading={changePassword.isPending}
				spinnerPlacement="end"
			>
				{t('actions.confirm')}
			</Button>
		</form>
	);
};
