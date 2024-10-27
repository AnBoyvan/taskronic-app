import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { ROUTES } from '@/configs/routes.config';

import { ChangePassword } from './ChangePassword';

export const UserSettings = () => {
	const t = useTranslations();

	return (
		<div className="w-full max-w-md flex flex-col items-center mx-auto py-4 lg:py-8">
			<ChangePassword />
			<Button
				as={Link}
				href={`${ROUTES.PROFILE}/delete`}
				variant="light"
				color="danger"
				size="sm"
				className="mt-4 lg:mt-8 self-start"
			>
				{t('user.delete')}
			</Button>
		</div>
	);
};
