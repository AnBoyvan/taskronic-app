'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Link } from '@nextui-org/react';

import { toast } from 'sonner';

import { login } from '@/actions/auth/login';
import { FormInput } from '@/components/ui/FormInput';
import { ROUTES } from '@/configs/routes.config';
import { useValidation } from '@/hooks/useValidation';
import { ILoginForm } from '@/interfaces/auth.interface';

export const Login: React.FC = () => {
	const t = useTranslations();
	const { loginSchema } = useValidation();
	const [isPending, startTransition] = useTransition();
	const params = useSearchParams();
	const callbackUrl = params.get('callbackUrl');

	const { control, handleSubmit, reset } = useForm<ILoginForm>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<ILoginForm> = async data => {
		startTransition(async () => {
			const result = await login(data, callbackUrl);
			if (result?.error) {
				toast.error(result.error, { closeButton: false });
			}
			reset();
		});
	};

	return (
		<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
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
			<Link href={`${ROUTES.PASS}`} size="sm" underline="hover" color="primary">
				{t('page.signin.forgot_pass')}
			</Link>
			<Button
				disabled={isPending}
				fullWidth={true}
				color="primary"
				variant="solid"
				type="submit"
				isLoading={isPending}
				spinnerPlacement="end"
			>
				{t('button.sign_in')}
			</Button>
		</form>
	);
};
