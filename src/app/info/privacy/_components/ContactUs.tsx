import { useTranslations } from 'next-intl';

import { InfoSection } from '../../_components/InfoSection';

export const ContactUs: React.FC = () => {
	const t = useTranslations('privacy.contact');

	return <InfoSection htag="h2" id="contact" title={t('title')} description={t('descr')} />;
};
