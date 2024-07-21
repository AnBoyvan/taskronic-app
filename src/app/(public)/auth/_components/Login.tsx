'use client';

import { useMessages, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Link } from '@nextui-org/react';

import { toast } from 'sonner';

import { login } from '@/actions/login';
import { FormInput } from '@/components/ui/FormInput';
import { ROUTES } from '@/configs/routes.config';
import { ILoginForm } from '@/interfaces/auth.interface';
import { getLoginSchema } from '@/utils/validation/getLoginSchema';

export const Login: React.FC = () => {
	const t = useTranslations();
	const {
		form: { error },
	} = useMessages() as IntlMessages;
	const [isPending, startTransition] = useTransition();
	const params = useSearchParams();
	const callbackUrl = params.get('callbackUrl');

	const { control, handleSubmit } = useForm<ILoginForm>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(getLoginSchema(error)),
	});

	const onSubmit: SubmitHandler<ILoginForm> = async data => {
		startTransition(async () => {
			const result = await login(data, callbackUrl);
			if (result) {
				toast.error(result, { closeButton: false });
			}
		});
	};

	return (
		<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				disabled={isPending}
				size="sm"
				variant="bordered"
				name="email"
				label={t('form.label.email')}
				control={control}
			/>
			<FormInput
				disabled={isPending}
				size="sm"
				color="default"
				variant="bordered"
				name="password"
				label={t('form.label.pass')}
				control={control}
				type="password"
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
