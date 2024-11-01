import { useTranslations } from 'next-intl';

import { InfoSection } from '../../_components/InfoSection';

export const SecurityOfPersonalData: React.FC = () => {
	const t = useTranslations('privacy.collecting-and-using-data.security');

	return <InfoSection id="security" title={t('title')} description={t('descr')} />;
};
