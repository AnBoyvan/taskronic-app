import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button, Navbar, NavbarContent } from '@nextui-org/react';

import { Logo } from '@/components/svg/Logo';
import { Name } from '@/components/svg/Name';
import { ROUTES } from '@/configs/routes.config';

import { LocaleSwitcher } from '../tmp/LocaleSwitcher';

export const PublicHeader: React.FC = async () => {
	const t = useTranslations();
	return (
		<Navbar maxWidth="full">
			<NavbarContent justify="start">
				<Link
					href={`/`}
					className="flex flex-row items-center gap h-10 hover:opacity-hover transition-opacity"
				>
					<div className="w-10">
						<Logo />
					</div>
					<div className="flex flex-row items-center h-10 w-36">
						<Name />
					</div>
				</Link>
			</NavbarContent>
			<NavbarContent justify="end">
				<LocaleSwitcher />
				<Button as={Link} href={`${ROUTES.AUTH}`} color="primary" variant="solid">
					{t('button.sign_in')}
				</Button>
			</NavbarContent>
		</Navbar>
	);
};
