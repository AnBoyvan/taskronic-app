import { useTranslations } from 'next-intl';

import { Card, CardBody, Divider } from '@nextui-org/react';

import { GoogleBtn } from './GoogleBtn';

type AuthProps = {
	children: React.ReactNode;
	title: 'create_account' | 'wellcome_back';
};

export const Auth: React.FC<AuthProps> = ({ title, children }) => {
	const t = useTranslations();
	return (
		<Card
			fullWidth
			radius="sm"
			className="max-w-[500px] h-full bg-default-50 dark:bg-default-50 p-0"
		>
			<CardBody className="p-4">
				<h1 className="w-full text-2xl text-center">{t(`auth.${title}`)}</h1>
				{children}
				<Divider />
				<div className="flex flex-col gap-4 mt-4 px-0">
					<div className="text-xs text-center">{t('auth.use_account')}</div>
					<GoogleBtn />
				</div>
			</CardBody>
		</Card>
	);
};
