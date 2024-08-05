'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useTransition } from 'react';

import { Button } from '@nextui-org/react';

import { AUTH_REDIRECT } from '@/configs/routes.config';

import google from '/public/images/google.png';

const gLogo = <Image src={google} alt="Google" className="w-6" />;

export const GoogleBtn: React.FC = () => {
	const [isPending, startTransition] = useTransition();
	const params = useSearchParams();
	const callbackUrl = params.get('callbackUrl');

	const onClick = () => {
		startTransition(async () => {
			signIn('google', { callbackUrl: callbackUrl || AUTH_REDIRECT });
		});
	};

	return (
		<Button
			variant="ghost"
			color="primary"
			fullWidth={true}
			startContent={gLogo}
			onClick={onClick}
			disabled={isPending}
			isLoading={isPending}
			spinnerPlacement="end"
		>
			GOOGLE
		</Button>
	);
};
