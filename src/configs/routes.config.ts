const withouthAuth = {
	HOME: ``,
	AUTH: `/auth`,
	PASS: `/password`,
};

const withAuth = {
	INVITE: `/invite`,
	BOARDS: `/boards`,
	TASKS: `/tasks`,
	NOTES: `/notes`,
	CALENDAR: `/calendar`,
	WORKSPACE: `/workspace`,
};

export const AUTH_REDIRECT = withAuth.CALENDAR;

export const publicRoutes = Object.values(withouthAuth);

export const privateRoutes = Object.values(withAuth);

export const ROUTES = { ...withouthAuth, ...withAuth };
