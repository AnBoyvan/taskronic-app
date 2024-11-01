import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { infoNav } from '@/configs/nav.config';
import { ROUTES } from '@/configs/routes.config';

export default function InfoPage() {
	const t = useTranslations();

	const filtered = infoNav.filter(({ value }) => value !== ROUTES.INFO);

	return (
		<div className="flex flex-col">
			{filtered.map(({ label, value }) => (
				<Link
					key={t(label)}
					href={value}
					className="text-xl text-foreground hover:text-primary transition-colors p-4 border-b border-divider"
				>
					{t(label)}
				</Link>
			))}
		</div>
	);
}
