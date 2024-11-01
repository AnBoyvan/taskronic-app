const infoPages = {
	INFO: '/info',
	ABOUT: '/info/about',
	PRIVACY: '/info/privacy',
	TERMS: '/info/terms',
};

const withouthAuth = {
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	AUTH_ERR: '/auth/error',
	PASS: '/auth/password',
};

const withAuth = {
	PROFILE: '/profile',
	BOARDS: '/boards',
	TASKS: '/tasks',
	CALENDAR: '/calendar',
	WORKSPACE: '/w',
};

export const apiAuthPrefix = '/api/auth';

export const AUTH_REDIRECT = withAuth.BOARDS;

export const publicRoutes = Object.values(withouthAuth);

export const privateRoutes = Object.values(withAuth);

export const ROUTES = { ...withouthAuth, ...withAuth, ...infoPages };
