import { useTranslations } from 'next-intl';

import { InfoSection } from '../../_components/InfoSection';

export const ChangesToPrivacyPolicy: React.FC = () => {
	const t = useTranslations('privacy.changes');

	return <InfoSection htag="h2" id="changes" title={t('title')} description={t('descr')} />;
};
