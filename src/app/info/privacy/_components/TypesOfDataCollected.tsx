import { useTranslations } from 'next-intl';

import { InfoHtag } from '../../_components/InfoHtag';
import { InfoSection } from '../../_components/InfoSection';
import { InfoSectionList } from '../../_components/InfoSectionList';
import { CookiesTypes } from './CookiesTypes';

export const TypesOfDataCollected: React.FC = () => {
	const t = useTranslations('privacy.collecting-and-using-data');

	return (
		<>
			<InfoHtag tag="h2" title={t('title')} id="collecting-and-using-data" className="mt-4" />
			<InfoHtag
				tag="h3"
				title={t('types-of-data-collected.title')}
				id="types-of-data-collected"
				className="mt-4"
			/>
			<InfoSection
				htag="h4"
				title={t('types-of-data-collected.pdata.title')}
				description={t('types-of-data-collected.pdata.descr')}
			>
				<InfoSectionList
					items={[
						{ title: '', descr: t('types-of-data-collected.pdata.email') },
						{ title: '', descr: t('types-of-data-collected.pdata.data') },
					]}
				/>
			</InfoSection>
			<InfoSection
				htag="h4"
				title={t('types-of-data-collected.udata.title')}
				description={t('types-of-data-collected.udata.descr')}
			/>
			<InfoSection
				htag="h4"
				title={t('types-of-data-collected.tracking.title')}
				description={t('types-of-data-collected.tracking.descr')}
			>
				<InfoSectionList
					items={[
						{
							title: t('types-of-data-collected.cookies.title'),
							descr: t('types-of-data-collected.cookies.descr'),
						},
						{
							title: t('types-of-data-collected.beacons.title'),
							descr: t('types-of-data-collected.beacons.descr'),
						},
					]}
				/>
				<p className="leading-normal my-4">{t('types-of-data-collected.tracking.summary')}</p>
				<CookiesTypes />
				<p className="leading-normal my-4">{t('types-of-data-collected.summary')}</p>
			</InfoSection>
		</>
	);
};
