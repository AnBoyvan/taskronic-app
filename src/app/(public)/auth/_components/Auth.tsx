import { useTranslations } from 'next-intl';

import { Card, CardFooter, CardHeader, Divider } from '@nextui-org/react';

import { GoogleBtn } from './GoogleBtn';

type AuthProps = {
	children: React.ReactNode;
	title: 'create_account' | 'wellcome_back';
};

export const Auth: React.FC<AuthProps> = ({ title, children }) => {
	const t = useTranslations();
	return (
		<Card fullWidth className="max-w-[500px] bg-default-50 dark:bg-default-50 p-4">
			<CardHeader>
				<h1 className="w-full text-2xl text-center">{t(`auth.${title}`)}</h1>
			</CardHeader>
			{children}
			<Divider />
			<CardFooter className="flex flex-col gap-4 py-4 px-0">
				<div className="text-xs text-center">{t('auth.use_account')}</div>
				<GoogleBtn />
			</CardFooter>
		</Card>
	);
};
