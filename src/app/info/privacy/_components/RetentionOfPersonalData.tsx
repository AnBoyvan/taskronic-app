import { useTranslations } from 'next-intl';

import { InfoSection } from '../../_components/InfoSection';

export const RetentionOfPersonalData: React.FC = () => {
	const t = useTranslations('privacy.collecting-and-using-data.retention');

	return <InfoSection id="retention" title={t('title')} description={t('descr')} />;
};
