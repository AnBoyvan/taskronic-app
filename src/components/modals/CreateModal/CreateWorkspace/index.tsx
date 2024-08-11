'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

export const CreateWorkspace: React.FC = () => {
	const t = useTranslations();

	const [search, setSearch] = useState<string>('');

	return <div></div>;
};
