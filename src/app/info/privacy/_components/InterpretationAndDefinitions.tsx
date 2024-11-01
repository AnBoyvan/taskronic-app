import { useTranslations } from 'next-intl';

import { messages } from '@/configs/messages.config';

import { InfoHtag } from '../../_components/InfoHtag';
import { InfoSection } from '../../_components/InfoSection';
import { InfoSectionList } from '../../_components/InfoSectionList';

export const InterpretationAndDefinitions: React.FC = () => {
	const t = useTranslations('privacy.interpretation-and-definitions');

	const definitions = Object.keys(
		messages.privacy['interpretation-and-definitions'].definitions.defs,
	).map(i => ({
		title: t(`definitions.defs.${i}.title` as any),
		descr: t(`definitions.defs.${i}.descr` as any),
	}));

	return (
		<>
			<InfoHtag tag="h2" title={t('title')} id="interpretation-and-definitions" className="mt-4" />
			<InfoSection title={t('interpretation.title')} description={t('interpretation.descr')} />
			<InfoSection title={t('definitions.title')} description={t('definitions.descr')}>
				<InfoSectionList items={definitions} />
			</InfoSection>
		</>
	);
};
