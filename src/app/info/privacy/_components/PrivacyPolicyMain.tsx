import { useTranslations } from 'next-intl';

import { InfoHtag } from '../../_components/InfoHtag';

export const PrivacyPolicyMain: React.FC = () => {
	const t = useTranslations('privacy');

	return (
		<>
			<InfoHtag tag="h1" id="description" title={t('title')} className="text-center" />
			<p className="mt-4">{t('updated')}</p>
			<p className="mt-4">{t('descr')}</p>
		</>
	);
};
