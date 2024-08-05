import { useTranslations } from 'next-intl';

import { Logo } from '@/components/svg/Logo';
import { Name } from '@/components/svg/Name';

export const Brand: React.FC = () => {
	const t = useTranslations();
	return (
		<div className="hidden md:flex flex-col gap-2 items-center w-80 md:w-full">
			<div className="w-28">
				<Logo />
			</div>
			<div className="flex flex-row items-center w-full">
				<Name />
			</div>
			<p>{t('site.slogan')}</p>
		</div>
	);
};
