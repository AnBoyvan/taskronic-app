'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Switch } from '@nextui-org/react';

import { useWorkspaceEdit } from '@/hooks/useWorkspaceEdit';
import { WorkspaceSettings } from '@/types/workspace.interface';

type WorkspaceSettingsItemProps = {
	workspaceId: string;
	label: TranslationKeys;
	value: keyof WorkspaceSettings;
	settings: WorkspaceSettings;
	isDisabled: boolean;
};

export const WorkspaceSettingsItem: React.FC<WorkspaceSettingsItemProps> = ({
	workspaceId,
	label,
	value,
	settings,
	isDisabled,
}) => {
	const t = useTranslations();
	const [isSelected, setIsSelected] = useState<boolean>(settings[value]);

	const { updSettings } = useWorkspaceEdit();

	const onChange = () => {
		const data = {
			...settings,
			[value]: !isSelected,
		};

		updSettings.mutate({ workspaceId, dto: data });

		setIsSelected(!isSelected);
	};

	return (
		<li className="h-full w-full flex flex-row gap-8 justify-between items-center">
			<p className="text-sm">{t(label)}</p>
			<Switch
				color="success"
				isSelected={isSelected}
				isDisabled={isDisabled || updSettings.isPending}
				onValueChange={onChange}
			/>
		</li>
	);
};
