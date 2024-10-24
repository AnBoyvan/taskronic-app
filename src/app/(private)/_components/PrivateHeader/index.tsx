import { Link, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';

import { Logo } from '@/components/svg/Logo';
import { Name } from '@/components/svg/Name';
import { AUTH_REDIRECT } from '@/configs/routes.config';

import { Account } from './Account';
import { CreateButton } from './CreateButton';
import { Info } from './Info';
import { Notifications } from './Notifications';
import { SearchBar } from './SearchBar';

export const PrivateHeader: React.FC = () => {
	return (
		<Navbar
			isBlurred
			height={12}
			maxWidth="full"
			position="static"
			className="border-b border-divider h-12 min-h-12"
			classNames={{
				wrapper: 'px-4 md:px-6',
			}}
		>
			<NavbarContent justify="start" className="relative flex flex-row justify-start gap-4">
				<NavbarBrand className="flex flex-row flex-grow-0 gap-4 px-0">
					<Link
						color="foreground"
						href={AUTH_REDIRECT}
						className="flex flex-row justify-between gap-1 h-10 hover:opacity-hover transition-opacity"
					>
						<Logo width={24} />
						<Name width={100} />
					</Link>
				</NavbarBrand>
				<CreateButton />
			</NavbarContent>

			<NavbarContent justify="end" className="gap-1">
				<SearchBar />
				<Info />
				<Notifications />
				<Account />
			</NavbarContent>
		</Navbar>
	);
};
