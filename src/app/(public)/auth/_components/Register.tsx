'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/react';

import { toast } from 'sonner';

import { register } from '@/actions/auth/register';
import { FormInput } from '@/components/ui/FormInput';
import { useValidation } from '@/hooks/useValidation';
import { IRegisterForm } from '@/interfaces/auth.interface';

export const Register: React.FC = () => {
	const t = useTranslations();
	const { registerSchema } = useValidation();
	const [isPending, startTransition] = useTransition();
	const params = useSearchParams();
	const callbackUrl = params.get('callbackUrl');

	const { control, handleSubmit, reset } = useForm<IRegisterForm>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(registerSchema),
	});

	const onSubmit: SubmitHandler<IRegisterForm> = async data => {
		startTransition(async () => {
			const result = await register(data, callbackUrl);
			if (result) {
				toast.error(result, { closeButton: false });
			}
			reset();
		});
	};

	return (
		<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				control={control}
				variant="bordered"
				icon="User"
				name="name"
				label={t('form.label.name')}
				placeholder={t('form.placeholder.name')}
				isRequired
				disabled={isPending}
			/>
			<FormInput
				control={control}
				variant="bordered"
				icon="Mail"
				name="email"
				label={t('form.label.email')}
				placeholder={t('form.placeholder.email')}
				isRequired
				disabled={isPending}
			/>
			<FormInput
				control={control}
				variant="bordered"
				icon="LockKeyhole"
				name="password"
				label={t('form.label.pass')}
				placeholder={t('form.placeholder.pass')}
				isRequired
				type="password"
				disabled={isPending}
			/>
			<FormInput
				control={control}
				variant="bordered"
				icon="LockKeyhole"
				name="confirmPassword"
				label={t('form.label.confirm_pass')}
				placeholder={t('form.placeholder.pass')}
				isRequired
				type="password"
				disabled={isPending}
			/>
			<Button
				fullWidth={true}
				color="primary"
				variant="solid"
				type="submit"
				disabled={isPending}
				isLoading={isPending}
				spinnerPlacement="end"
			>
				{t('button.create_account')}
			</Button>
		</form>
	);
};
