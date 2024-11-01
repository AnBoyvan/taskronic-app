import { useTranslations } from 'next-intl';

import { PageContainer } from '@/components/layout/PageContainer';
import { messages } from '@/configs/messages.config';

import { InfoHtag } from '../../_components/InfoHtag';
import { InfoSection } from '../../_components/InfoSection';
import { InfoSectionList } from '../../_components/InfoSectionList';

export const TermsOfService: React.FC = () => {
	const t = useTranslations('terms');

	const terms = Object.keys(messages.terms.terms_list).map(i => ({
		id: i,
		title: t(`terms_list.${i}.title` as any),
		descr: t(`terms_list.${i}.descr` as any),
	}));

	const options = Object.keys(messages.terms.terms_list.conduct.options).map(opt => ({
		title: '',
		descr: t(`terms_list.conduct.options.${opt}` as any),
	}));

	return (
		<PageContainer scroll className="h-full">
			<InfoHtag id="terms" tag="h1" title={t('title')} className="text-center" />
			<p className="leading-normal mt-4">{t('descr')}</p>
			{terms.map(term => (
				<InfoSection key={term.id} id={term.id} title={term.title} description={term.descr}>
					{term.title === t('terms_list.conduct.title') && <InfoSectionList items={options} />}
				</InfoSection>
			))}
			<InfoHtag tag="h4" title={t('summary')} className="mt-4" />
		</PageContainer>
	);
};
