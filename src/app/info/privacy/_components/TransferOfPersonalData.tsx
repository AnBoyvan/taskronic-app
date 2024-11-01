import { useTranslations } from 'next-intl';

import { InfoSection } from '../../_components/InfoSection';

export const TransferOfPersonalData: React.FC = () => {
	const t = useTranslations('privacy.collecting-and-using-data.transfer');

	return <InfoSection id="transfer" title={t('title')} description={t('descr')} />;
};
