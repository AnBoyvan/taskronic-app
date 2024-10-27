'use client';

import { useLocale, useTranslations } from 'next-intl';

import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';

import { forgotPassword } from '@/actions/auth/forgotPassword';
import { FormInput } from '@/components/ui/FormInput';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { useValidation } from '@/hooks/useValidation';
import { ForgotPassRequest } from '@/types/auth.interface';

export const ForgotPassword: React.FC = () => {
	const t = useTranslations();
	const locale = useLocale();
	const { forgotPasswordSchema } = useValidation();
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const [error, setError] = useState<string | undefined>(undefined);

	const { control, handleSubmit, reset } = useForm<ForgotPassRequest>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			lang: locale,
		},
		resolver: yupResolver(forgotPasswordSchema),
	});

	const onSubmit: SubmitHandler<ForgotPassRequest> = async data => {
		startTransition(async () => {
			const result = await forgotPassword(data);
			if (result?.error) {
				setError(result.error);
			}
			if (!result?.error) {
				setSuccess(t('auth.pass_req_succes'));
			}
			reset();
		});
	};

	return (
		<Card fullWidth radius="sm" className="max-w-[500px] bg-default-50 gap-4 p-4">
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
						<h1 className="w-full text-xl text-center">{t(`auth.did_forgot_pass`)}</h1>
						<p className="text-center">{t(`auth.enter_email`)}</p>
					</CardHeader>
					<CardBody as="form" className="gap-4 py-4 px-0" onSubmit={handleSubmit(onSubmit)}>
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
						<Button
							isDisabled={isPending}
							radius="sm"
							fullWidth={true}
							color="primary"
							variant="solid"
							type="submit"
							isLoading={isPending}
							spinnerPlacement="end"
						>
							{t('actions.send')}
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
