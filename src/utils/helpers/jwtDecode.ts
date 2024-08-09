import { JWT } from 'next-auth/jwt';

import jwt from 'jsonwebtoken';

import { Tokens, jwtPayload } from '@/interfaces/auth.interface';

const JWT_SECRET = process.env.AUTH_SECRET || '';

export const jwtDecode = (tokens: Tokens): JWT => {
	const { iat, ...rest } = jwt.verify(tokens.accessToken, JWT_SECRET) as jwtPayload;

	return {
		user: { ...rest },
		accessToken: tokens.accessToken,
	};
};
