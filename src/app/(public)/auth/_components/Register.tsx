'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/react';

import { toast } from 'sonner';

import { register } from '@/actions/auth/register';
import { FormInput } from '@/components/ui/FormInput';
import { AUTH_REDIRECT, ROUTES } from '@/configs/routes.config';
import { useValidation } from '@/hooks/useValidation';
import { RegisterForm } from '@/types/auth.interface';

export const Register: React.FC = () => {
	const t = useTranslations();
	const { registerSchema } = useValidation();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const params = useSearchParams();
	const callbackUrl = params.get('callbackUrl');

	const { control, handleSubmit, reset } = useForm<RegisterForm>({
		mode: 'onBlur',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(registerSchema),
	});

	const onSubmit: SubmitHandler<RegisterForm> = async data => {
		startTransition(async () => {
			const result = await register(data);
			if (result) {
				toast.error(result, { closeButton: false });
			} else {
				router.push(callbackUrl || AUTH_REDIRECT);
			}
			reset();
		});
	};

	return (
		<form className="flex flex-col gap-4 py-4 px-0" onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				control={control}
				variant="faded"
				icon="User"
				name="name"
				label={t('common.name')}
				placeholder={t('auth.placeholder_name')}
				isRequired
				isDisabled={isPending}
			/>
			<FormInput
				control={control}
				variant="faded"
				icon="Mail"
				name="email"
				label={t('common.email')}
				placeholder={t('auth.placeholder_email')}
				isRequired
				isDisabled={isPending}
			/>
			<FormInput
				control={control}
				variant="faded"
				icon="LockKeyhole"
				name="password"
				label={t('common.pass')}
				placeholder={t('auth.placeholder_pass')}
				isRequired
				type="password"
				isDisabled={isPending}
			/>
			<FormInput
				control={control}
				variant="faded"
				icon="LockKeyhole"
				name="confirmPassword"
				label={t('auth.confirm_pass')}
				placeholder={t('auth.placeholder_pass')}
				isRequired
				type="password"
				isDisabled={isPending}
			/>
			<p className="text-wrap text-xs break-words">
				{t('auth.agree')}
				<Link href={ROUTES.PRIVACY} className="text-primary hover:underline">
					{t('privacy.label')}
				</Link>
				{t('common.and')}
				<Link href={ROUTES.TERMS} className="text-primary hover:underline">
					{t('terms.label')}
				</Link>
			</p>
			<Button
				fullWidth={true}
				radius="sm"
				color="primary"
				variant="solid"
				type="submit"
				isDisabled={isPending}
				isLoading={isPending}
				spinnerPlacement="end"
			>
				{t('auth.sign_up')}
			</Button>
			<div className="text-center">
				<span>{t('auth.have_account')}&nbsp;</span>
				<Link
					href={`${ROUTES.LOGIN}`}
					className="text-primary hover:underline"
					data-focus-visible={false}
				>
					{t('auth.sign_in')}
				</Link>
			</div>
		</form>
	);
};
