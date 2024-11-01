import { useTranslations } from 'next-intl';
import Link from 'next/link';

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
} from '@nextui-org/react';

import { Logo } from '@/components/svg/Logo';
import { Name } from '@/components/svg/Name';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';

import { InfoMenu } from './InfoMenu';

export const InfoHeader: React.FC = () => {
	const t = useTranslations();
	return (
		<Navbar isBlurred maxWidth="full" position="static" isBordered>
			<NavbarContent className="md:hidden max-w-6">
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarBrand className="justify-center md:justify-start">
				<Link
					target="_blank"
					href={`/`}
					className="flex flex-row text-foreground justify-between gap-1 h-10 hover:opacity-hover transition-opacity"
				>
					<Logo width={36} />
					<Name width={130} />
				</Link>
			</NavbarBrand>
			<NavbarContent justify="end" className="max-w-[72px]">
				<LocaleSwitcher />
			</NavbarContent>
			<NavbarMenu>
				<InfoMenu />
			</NavbarMenu>
		</Navbar>
	);
};
