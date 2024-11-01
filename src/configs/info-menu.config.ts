import { ROUTES } from './routes.config';

type SubItem = {
	label: TranslationKeys;
	anchor: string;
};

type MenuItem = {
	label: TranslationKeys;
	link: string;
	sub: SubItem[];
};

export const infoMenu: MenuItem[] = [
	{
		label: 'about.title',
		link: ROUTES.ABOUT,
		sub: [
			{
				label: 'about.features.workspaces.title',
				anchor: 'workspaces',
			},
			{
				label: 'about.features.boards-and-cards.title',
				anchor: 'boards-and-cards',
			},
			{
				label: 'about.features.schedule.title',
				anchor: 'schedule',
			},
			{
				label: 'about.features.priority.title',
				anchor: 'priority',
			},
			{
				label: 'about.features.comments.title',
				anchor: 'comments',
			},
			{
				label: 'about.features.checklists.title',
				anchor: 'checklists',
			},
			{
				label: 'about.features.filtering-options.title',
				anchor: 'filtering-options',
			},
			{
				label: 'about.features.real-time-collaboration.title',
				anchor: 'features.real-time-collaboration',
			},
			{
				label: 'about.features.auth.title',
				anchor: 'auth',
			},
			{
				label: 'about.features.purpose.title',
				anchor: 'purpose',
			},
		],
	},
	{
		label: 'privacy.title',
		link: ROUTES.PRIVACY,
		sub: [
			{
				label: 'common.description',
				anchor: 'description',
			},
			{
				label: 'privacy.interpretation-and-definitions.title',
				anchor: 'interpretation-and-definitions',
			},
			{
				label: 'privacy.collecting-and-using-data.title',
				anchor: 'collecting-and-using-data',
			},
			{
				label: 'privacy.collecting-and-using-data.types-of-data-collected.title',
				anchor: 'types-of-data-collected',
			},
			{
				label: 'privacy.collecting-and-using-data.use-personal-data.title',
				anchor: 'use-personal-data',
			},
			{
				label: 'privacy.collecting-and-using-data.retention.title',
				anchor: 'retention',
			},
			{
				label: 'privacy.collecting-and-using-data.transfer.title',
				anchor: 'transfer',
			},
			{
				label: 'privacy.collecting-and-using-data.delete.title',
				anchor: 'delete',
			},
			{
				label: 'privacy.collecting-and-using-data.disclosure.title',
				anchor: 'disclosure',
			},
			{
				label: 'privacy.collecting-and-using-data.security.title',
				anchor: 'security',
			},
			{
				label: 'privacy.childrens-privacy.title',
				anchor: 'childrens-privacy',
			},
			{
				label: 'privacy.links.title',
				anchor: 'links',
			},
			{
				label: 'privacy.changes.title',
				anchor: 'changes',
			},
		],
	},
	{
		label: 'terms.title',
		link: ROUTES.TERMS,
		sub: [
			{
				label: 'common.description',
				anchor: 'terms',
			},
			{
				label: 'terms.terms_list.acceptance.title',
				anchor: 'acceptance',
			},
			{
				label: 'terms.terms_list.changes.title',
				anchor: 'changes',
			},
			{
				label: 'terms.terms_list.accounts.title',
				anchor: 'accounts',
			},
			{
				label: 'terms.terms_list.conduct.title',
				anchor: 'conduct',
			},
			{
				label: 'terms.terms_list.copyright.title',
				anchor: 'copyright',
			},
			{
				label: 'terms.terms_list.disclaimers.title',
				anchor: 'disclaimers',
			},
			{
				label: 'terms.terms_list.limitation.title',
				anchor: 'limitation',
			},
			{
				label: 'terms.terms_list.indemnification.title',
				anchor: 'indemnification',
			},
			{
				label: 'terms.terms_list.law.title',
				anchor: 'law',
			},
			{
				label: 'terms.terms_list.contact.title',
				anchor: 'contact',
			},
		],
	},
];
