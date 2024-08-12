'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';

import { resetPassword } from '@/actions/auth/resetPassword';
import { FormInput } from '@/components/ui/FormInput';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { useValidation } from '@/hooks/useValidation';
import { ResetPassForm } from '@/types/auth.interface';

export const ResetPassword: React.FC = () => {
	const t = useTranslations();
	const { passwordToken } = useParams<{ passwordToken: string }>();
	const { resetPasswordSchema } = useValidation();
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const [error, setError] = useState<string | undefined>(undefined);

	const { control, handleSubmit, reset } = useForm<ResetPassForm>({
		mode: 'onBlur',
		defaultValues: {
			token: passwordToken,
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(resetPasswordSchema),
	});

	const onSubmit: SubmitHandler<ResetPassForm> = async data => {
		startTransition(async () => {
			const result = await resetPassword(data);
			if (result?.error) {
				setError(result.error);
			}
			if (!result?.error) {
				setSuccess(t('auth.pass_changed'));
			}
			reset();
		});
	};

	return (
		<Card fullWidth className="max-w-[500px] bg-default-50 gap-4 p-4">
			{error || success ? (
				<CardBody
					className={`flex-row gap-4 items-center p-4 ${error ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'} rounded-2xl`}
				>
					<Icon name={error ? 'TriangleAlert' : 'CircleCheckBig'} size={32} />
					<div>{error ? error : success}</div>
				</CardBody>
			) : (
				<>
					<CardHeader className="flex-col gap-4 p-0">
						<h1 className="w-full text-xl text-center">{t(`auth.pass_reset`)}</h1>
					</CardHeader>
					<CardBody as="form" className="gap-4 py-4 px-0" onSubmit={handleSubmit(onSubmit)}>
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
							disabled={isPending}
							fullWidth={true}
							color="primary"
							variant="solid"
							type="submit"
							isLoading={isPending}
							spinnerPlacement="end"
						>
							{t('auth.confirm')}
						</Button>
					</CardBody>
				</>
			)}
			<CardFooter className="justify-center p-0">
				<Link
					href={`${ROUTES.LOGIN}`}
					underline="hover"
					color="primary"
					className="hover:cursor-pointer"
					data-focus-visible={false}
				>
					{t('auth.back_to_auth')}
				</Link>
			</CardFooter>
		</Card>
	);
};
