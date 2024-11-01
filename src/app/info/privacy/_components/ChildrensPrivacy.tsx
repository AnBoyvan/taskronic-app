import { useTranslations } from 'next-intl';

import { InfoSection } from '../../_components/InfoSection';

export const ChildrensPrivacy: React.FC = () => {
	const t = useTranslations('privacy.childrens-privacy');

	return (
		<InfoSection htag="h2" id="childrens-privacy" title={t('title')} description={t('descr')} />
	);
};
