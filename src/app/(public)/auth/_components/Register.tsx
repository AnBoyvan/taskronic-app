'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CardBody, Link } from '@nextui-org/react';

import { toast } from 'sonner';

import { register } from '@/actions/auth/register';
import { FormInput } from '@/components/ui/FormInput';
import { AUTH_REDIRECT, ROUTES } from '@/configs/routes.config';
import { useValidation } from '@/hooks/useValidation';
import { IRegisterForm } from '@/interfaces/auth.interface';

export const Register: React.FC = () => {
	const t = useTranslations();
	const { registerSchema } = useValidation();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const params = useSearchParams();
	const callbackUrl = params.get('callbackUrl');

	const { control, handleSubmit, reset } = useForm<IRegisterForm>({
		mode: 'onBlur',
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
		<CardBody as="form" className="gap-4 py-4 px-0" onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				control={control}
				variant="faded"
				icon="User"
				name="name"
				label={t('label.name')}
				placeholder={t('placeholder.name')}
				isRequired
				disabled={isPending}
			/>
			<FormInput
				control={control}
				variant="faded"
				icon="Mail"
				name="email"
				label={t('label.email')}
				placeholder={t('placeholder.email')}
				isRequired
				disabled={isPending}
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
				disabled={isPending}
			/>
			<FormInput
				control={control}
				variant="faded"
				icon="LockKeyhole"
				name="confirmPassword"
				label={t('label.confirm_pass')}
				placeholder={t('placeholder.pass')}
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
				{t('auth.sign_up')}
			</Button>
			<div className="text-center">
				<span>{t('auth.have_account')}&nbsp;</span>
				<Link
					href={`${ROUTES.LOGIN}`}
					underline="hover"
					color="primary"
					className="hover:cursor-pointer"
					data-focus-visible={false}
				>
					{t('auth.sign_in')}
				</Link>
			</div>
		</CardBody>
	);
};
