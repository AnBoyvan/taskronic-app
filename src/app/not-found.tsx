import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
	const t = await getTranslations();

	return (
		<div className="relative mx-auto  px-4 md:px-6 lg:px-8 py-16 md:py-[72px] lg:py-24 min-h-screen flex flex-col justify-center items-center gap-4 lg:gap-4">
			<p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13rem] text-divider/5 font-semibold -z-10">
				404
			</p>
			<p className="text-3xl text-center">{t('general.not_found')}</p>
			<Link href="/" className="text-primary hover:opacity-70 transition-opacity">
				{t('actions.back')}
			</Link>
		</div>
	);
}
