import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import authConfig from '@/configs/auth.config';

import {
	apiAuthPrefix,
	AUTH_REDIRECT,
	privateRoutes,
	publicRoutes,
	ROUTES,
} from './configs/routes.config';

const { auth } = NextAuth(authConfig);

export default auth(request => {
	const { nextUrl } = request;
	const isLoggedIn = !!request.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.some(route => nextUrl.pathname.startsWith(route));
	const isPrivateRoute = privateRoutes.some(route => nextUrl.pathname.startsWith(route));

	if (isApiAuthRoute) {
		return NextResponse.next();
	}

	if (isPublicRoute || nextUrl.pathname === '/') {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(AUTH_REDIRECT, nextUrl));
		}
		return NextResponse.next();
	}

	if (!isLoggedIn && isPrivateRoute) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}
		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return NextResponse.redirect(
			new URL(`${ROUTES.LOGIN}?callbackUrl=${encodedCallbackUrl}`, nextUrl),
		);
	}

	return NextResponse.next();
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
