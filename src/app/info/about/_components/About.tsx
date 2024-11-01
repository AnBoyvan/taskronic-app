import { useTranslations } from 'next-intl';

import { PageContainer } from '@/components/layout/PageContainer';
import { messages } from '@/configs/messages.config';

import { InfoHtag } from '../../_components/InfoHtag';
import { InfoSection } from '../../_components/InfoSection';

export const About: React.FC = () => {
	const t = useTranslations('about');

	const features = Object.keys(messages.about.features);

	return (
		<PageContainer scroll className="h-full">
			<InfoHtag tag="h1" title={t('title')} className="text-center" />
			<p className="leading-normal mt-4">{t('intro')}</p>
			<p className="leading-normal mt-4">{t('features_title')}:</p>
			{features.map(i => (
				<InfoSection
					key={i}
					id={i}
					title={t(`features.${i}.title` as any)}
					description={t(`features.${i}.descr` as any)}
				/>
			))}
		</PageContainer>
	);
};
