import { useTranslations } from 'next-intl';

import { InfoSection } from '../../_components/InfoSection';

export const DeletePersonalData: React.FC = () => {
	const t = useTranslations('privacy.collecting-and-using-data.delete');

	return <InfoSection id="delete" title={t('title')} description={t('descr')} />;
};
