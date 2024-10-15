'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { Loader } from '@/components/layout/Loader';
import { useUser } from '@/hooks/useUser';
import { IUser } from '@/types/user.interface';

type UserProviderProps = {
	user?: IUser;
	error?: string;
};

export const UserProvider: React.FC<UserProviderProps> = ({ user, error }) => {
	const [loading, setLoading] = useState<boolean>(true);

	const { isLoading, setUser } = useUser();

	useEffect(() => {
		if (error) {
			toast.error(error, { closeButton: false });
		}
	}, [error]);

	useEffect(() => {
		if (user) {
			setUser(user);
		}
	}, [user]);

	useEffect(() => {
		if (!isLoading) {
			setLoading(isLoading);
		}
	}, [isLoading]);

	return <>{loading ? <Loader /> : null}</>;
};
