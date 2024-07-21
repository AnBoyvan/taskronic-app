import 'next-auth/jwt';

import { IUser } from '@/interfaces/user.interface';

declare module 'next-auth' {
	interface User {
		accessToken: string;
		refreshToken: string;
	}

	// interface Account {}

	interface DefaultSession {
		user?: IUser;
		accessToken?: string;
	}

	interface Session extends DefaultSession {
		user: IUser;
		accessToken: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: IUser;
		accessToken: string;
		access_exp: number;
		refreshToken: string;
		exp: number;
	}
}
