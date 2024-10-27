import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';

import { Logo } from '@/components/svg/Logo';
import { Name } from '@/components/svg/Name';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ROUTES } from '@/configs/routes.config';

export const PublicHeader: React.FC = () => {
	const t = useTranslations();
	return (
		<Navbar isBlurred maxWidth="full" position="static">
			<NavbarBrand>
				<Link
					href={`/`}
					className="flex flex-row text-foreground justify-between gap-1 h-10 hover:opacity-hover transition-opacity"
				>
					<Logo width={24} />
					<Name width={100} />
				</Link>
			</NavbarBrand>
			<NavbarContent justify="end">
				<LocaleSwitcher />
				<Button as={Link} href={`${ROUTES.LOGIN}`} color="primary" variant="solid" radius="sm">
					{t('auth.sign_in')}
				</Button>
			</NavbarContent>
		</Navbar>
	);
};
