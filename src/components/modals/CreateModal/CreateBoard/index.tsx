'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { useCreateModal } from '@/hooks/useCreateModal';

export const CreateBoard: React.FC = () => {
	const t = useTranslations();
	const { workspace, onClose } = useCreateModal();

	const [search, setSearch] = useState<string>('');

	return <div>{workspace}</div>;
};
