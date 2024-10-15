'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Link } from '@nextui-org/react';

import { toast } from 'sonner';

import { login } from '@/actions/auth/login';
import { FormInput } from '@/components/ui/FormInput';
import { AUTH_REDIRECT, ROUTES } from '@/configs/routes.config';
import { useValidation } from '@/hooks/useValidation';
import { LoginForm } from '@/types/auth.interface';

export const Login: React.FC = () => {
	const t = useTranslations();
	const { loginSchema } = useValidation();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const params = useSearchParams();
	const callbackUrl = params.get('callbackUrl');

	const { control, handleSubmit, reset } = useForm<LoginForm>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginForm> = async data => {
		startTransition(async () => {
			const result = await login(data);
			if (result?.error) {
				toast.error(result.error, { closeButton: false });
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
				icon="Mail"
				name="email"
				label={t('label.email')}
				placeholder={t('placeholder.email')}
				isRequired
				isDisabled={isPending}
			/>
			<FormInput
				control={control}
				variant="faded"
				icon="LockKeyhole"
				name="password"
				label={t('label.pass')}
				placeholder={t('placeholder.pass')}
				isRequired
				type="password"
				isDisabled={isPending}
			/>
			<Link href={`${ROUTES.PASS}`} size="sm" underline="hover" color="primary">
				{t('auth.forgot_pass')}
			</Link>
			<Button
				isDisabled={isPending}
				fullWidth={true}
				color="primary"
				variant="solid"
				type="submit"
				isLoading={isPending}
				spinnerPlacement="end"
			>
				{t('auth.sign_in')}
			</Button>
			<div className="text-center">
				<span>{t('auth.dont_have_account')}&nbsp;</span>
				<Link
					href={`${ROUTES.REGISTER}`}
					underline="hover"
					color="primary"
					className="hover:cursor-pointer"
					data-focus-visible={false}
				>
					{t('auth.create_account')}
				</Link>
			</div>
		</form>
	);
};
