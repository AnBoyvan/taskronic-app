'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { Accordion, AccordionItem } from '@nextui-org/react';

import { infoMenu } from '@/configs/info-menu.config';

export const InfoMenu = () => {
	const t = useTranslations();
	const pathname = usePathname();

	return (
		<Accordion defaultSelectedKeys={[pathname]}>
			{infoMenu.map(({ label, link, sub }) => (
				<AccordionItem
					key={link}
					title={t(label)}
					classNames={{
						title: 'text-base',
						content: 'flex flex-col p-0 pb-4',
					}}
				>
					{sub.map(item => (
						<Link
							key={item.label}
							href={`${link}#${item.anchor}`}
							className={clsx('text-xs p-2 pl-4 text-foreground hover:text-primary transition-all')}
						>
							{t(item.label)}
						</Link>
					))}
				</AccordionItem>
			))}
		</Accordion>
	);
};
