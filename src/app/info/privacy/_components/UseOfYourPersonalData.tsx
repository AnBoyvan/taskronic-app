import { useTranslations } from 'next-intl';

import { messages } from '@/configs/messages.config';

import { InfoSection } from '../../_components/InfoSection';
import { InfoSectionList } from '../../_components/InfoSectionList';

export const UseOfYourPersonalData: React.FC = () => {
	const t = useTranslations('privacy.collecting-and-using-data.use-personal-data');

	const purposes = Object.keys(
		messages.privacy['collecting-and-using-data']['use-personal-data'].purposes,
	).map(pur => ({
		title: t(`purposes.${pur}.title` as any),
		descr: t(`purposes.${pur}.descr` as any),
	}));

	const situations = Object.keys(
		messages.privacy['collecting-and-using-data']['use-personal-data'].situations,
	).map(sit => ({
		title: t(`situations.${sit}.title` as any),
		descr: t(`situations.${sit}.descr` as any),
	}));

	return (
		<InfoSection id="use-personal-data" title={t('title')} description={t('purposes_title')}>
			<InfoSectionList items={purposes} />
			<p className="leading-normal my-4">{t('situations_title')}</p>
			<InfoSectionList items={situations} />
		</InfoSection>
	);
};
