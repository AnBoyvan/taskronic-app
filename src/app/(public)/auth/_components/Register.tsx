'use client';

import { useMessages, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@nextui-org/react';

import { toast } from 'sonner';

import { register } from '@/actions/register';
import { FormInput } from '@/components/ui/FormInput';
import { IRegisterForm } from '@/interfaces/auth.interface';
import { getRegisterSchema } from '@/utils/validation/getRegisterSchema';

export const Register: React.FC = () => {
	const t = useTranslations();
	const {
		form: { error },
	} = useMessages() as IntlMessages;
	const [isPending, startTransition] = useTransition();
	const params = useSearchParams();
	const callbackUrl = params.get('callbackUrl');

	const { control, handleSubmit } = useForm<IRegisterForm>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(getRegisterSchema(error)),
	});

	const onSubmit: SubmitHandler<IRegisterForm> = async data => {
		startTransition(async () => {
			const result = await register(data, callbackUrl);
			if (result) {
				toast.error(result, { closeButton: false });
			}
		});
	};

	return (
		<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				size="sm"
				variant="bordered"
				name="name"
				label={t('form.label.name')}
				control={control}
				disabled={isPending}
			/>
			<FormInput
				size="sm"
				variant="bordered"
				name="email"
				label={t('form.label.email')}
				control={control}
				disabled={isPending}
			/>
			<FormInput
				size="sm"
				color="default"
				variant="bordered"
				name="password"
				label={t('form.label.pass')}
				control={control}
				type="password"
				disabled={isPending}
			/>
			<FormInput
				size="sm"
				variant="bordered"
				name="confirmPassword"
				label={t('form.label.confirm_pass')}
				control={control}
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
