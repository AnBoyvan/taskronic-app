import 'next-auth/jwt';

declare module 'next-auth' {
	interface User {
		id?: string;
		sub?: string;
		email?: string;
		name?: string;
		accessToken?: string;
	}

	interface DefaultSession {
		user?: User;
		accessToken?: string;
		expires?: string;
	}

	interface Session extends DefaultSession {
		user: User;
		accessToken: string;
		expires?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: User;
		accessToken: string;
	}
}
