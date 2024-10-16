export const workspaceIconsArray = [
	'Settings',
	'User',
	'Info',
	'Activity',
	'Building2',
	'ChevronsLeftRight',
	'Cake',
	'House',
	'TicketCheck',
	'Users',
	'PawPrint',
	'Trello',
	'Factory',
	'ChartNoAxesCombined',
	'Zap',
	'DollarSign',
	'Euro',
	'Database',
	'Wrench',
	'Coffee',
	'Star',
	'Baby',
	'Wheat',
	'Wine',
	'Croissant',
	'Shirt',
	'ShoppingBasket',
	'CalendarDays',
	'Clock',
	'AudioLines',
] as const;

export type WorkspaceIcon = (typeof workspaceIconsArray)[number];
