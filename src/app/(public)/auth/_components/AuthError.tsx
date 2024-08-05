'use client';

import { useTranslations } from 'next-intl';

import { Card, CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';

export const AuthError: React.FC = () => {
	const t = useTranslations();

	return (
		<Card fullWidth className="max-w-[500px] bg-red-200 text-red-500">
			<CardHeader className="justify-center gap-4">
				<Icon name="Frown" size={48} />
				<h1 className="text-xl text-center">{t(`auth.auth_error`)}</h1>
			</CardHeader>
			<CardBody className="text-center">
				{t(`auth.auth_error_message`)}&nbsp;-&nbsp;
				{t('site.email')}
			</CardBody>
			<CardFooter className="justify-center">
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
