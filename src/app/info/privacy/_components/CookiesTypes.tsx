import { useTranslations } from 'next-intl';

export const CookiesTypes: React.FC = () => {
	const t = useTranslations('privacy.collecting-and-using-data.types-of-data-collected');

	const types = ['essential', 'notice', 'funct'].map(type => ({
		title: t(`cookies_types.${type}.title` as any),
		type: t(`cookies_types.${type}.type` as any),
		purpose: t(`cookies_types.${type}.purpose` as any),
	}));

	return (
		<ul className="pl-10">
			{types.map((i, idx) => (
				<li key={idx} className="mt-2 flex flex-col">
					<strong>{i.title}</strong>
					<p>
						{t('type')}
						{i.type}
					</p>
					<p>
						{t('admin')}
						{t('us')}
					</p>
					<p>
						{t('purpose')}
						{i.purpose}
					</p>
				</li>
			))}
		</ul>
	);
};
