'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Divider, Link } from '@nextui-org/react';

import { Container } from '@/components/layout/Container';

import { Brand } from './Brand';
import { GoogleBtn } from './GoogleBtn';
import { Login } from './Login';
import { Register } from './Register';

export const Auth: React.FC = () => {
	const t = useTranslations();
	const [login, setLogin] = useState<boolean>(false);

	return (
		<div
			className={`flex flex-col md:flex-row gap-4 items-center justify-center bg-primary-100 rounded-2xl w-full max-w-[1000px] p-4 md:p-8 min-h-[550px]`}
		>
			<Brand />
			<Container className="bg-background rounded-2xl max-w-[500px]">
				{login ? <Login /> : <Register />}
				<div className="flex flex-row justify-center">
					<span>
						{login ? t('page.signin.dont_have_account') : t('page.signin.have_account')}&nbsp;
					</span>
					<Link
						underline="hover"
						color="primary"
						onPress={() => setLogin(!login)}
						className="hover:cursor-pointer"
						data-focus-visible={false}
					>
						{login ? t('button.create_account') : t('button.sign_in')}
					</Link>
				</div>
				<Divider />
				<p className="text-xs text-center">{t('page.signin.use_account')}</p>
				<GoogleBtn />
			</Container>
		</div>
	);
};
