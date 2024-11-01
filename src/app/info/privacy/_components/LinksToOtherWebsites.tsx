import { useTranslations } from 'next-intl';

import { InfoSection } from '../../_components/InfoSection';

export const LinksToOtherWebsites: React.FC = () => {
	const t = useTranslations('privacy.links');

	return <InfoSection htag="h2" id="links" title={t('title')} description={t('descr')} />;
};
