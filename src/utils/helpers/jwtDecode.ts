import { JWT } from 'next-auth/jwt';

import jwt from 'jsonwebtoken';

import { ITokens, jwtPayload } from '@/interfaces/auth.interface';

const JWT_SECRET = process.env.AUTH_SECRET || '';

export const jwtDecode = (tokens: ITokens): JWT => {
	const { iat, ...rest } = jwt.verify(tokens.accessToken, JWT_SECRET) as jwtPayload;

	return {
		user: { ...rest },
		accessToken: tokens.accessToken,
	};
};
