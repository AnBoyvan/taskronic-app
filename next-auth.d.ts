import 'next-auth/jwt';

import { IUser } from '@/interfaces/user.interface';

declare module 'next-auth' {
	interface User {
		id?: string;
		accessToken: string;
	}

	// interface Account {}

	interface DefaultSession {
		user?: IUser;
		accessToken?: string;
		expires?: string;
	}

	interface Session extends DefaultSession {
		user: IUser;
		accessToken: string;
		expires?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: IUser;
		accessToken: string;
	}
}
