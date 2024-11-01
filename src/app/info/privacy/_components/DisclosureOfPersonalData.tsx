import { useTranslations } from 'next-intl';

import { messages } from '@/configs/messages.config';

import { InfoHtag } from '../../_components/InfoHtag';
import { InfoSection } from '../../_components/InfoSection';
import { InfoSectionList } from '../../_components/InfoSectionList';

export const DisclosureOfPersonalData: React.FC = () => {
	const t = useTranslations('privacy.collecting-and-using-data.disclosure');

	const options = Object.keys(
		messages.privacy['collecting-and-using-data'].disclosure.other.options,
	).map(i => ({ title: '', descr: t(`other.options.${i}` as any) }));

	return (
		<>
			<InfoHtag tag="h3" title={t('title')} id="disclosure" className="mt-4" />
			<InfoSection htag="h4" title={t('business.title')} description={t('business.descr')} />
			<InfoSection htag="h4" title={t('law.title')} description={t('law.descr')} />
			<InfoSection htag="h4" title={t('other.title')} description={t('other.descr')}>
				<InfoSectionList items={options} />
			</InfoSection>
		</>
	);
};
