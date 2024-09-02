'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/configs/routes.config';
import { useWorkspaceEdit } from '@/hooks/useWorkspaceEdit';

type DeleteWorkspaceProps = {
	workspaceId: string;
	workspaceName: TranslationKeys;
};

export const DeleteWorkspace: React.FC<DeleteWorkspaceProps> = ({ workspaceId, workspaceName }) => {
	const t = useTranslations();
	const { remove } = useWorkspaceEdit();
	const router = useRouter();

	const [checkName, setCheckName] = useState<string>('');

	const removeWorkspace = async () => {
		router.push(ROUTES.BOARDS);
		await remove.mutate(workspaceId);
	};

	const confirmed = workspaceName === checkName;

	return (
		<>
			<Popover placement="top-start" offset={0} shadow="lg" radius="sm">
				<PopoverTrigger>
					<Button variant="light" color="danger" size="sm">
						{t('workspace.remove_button')}?
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-2 w-80 flex flex-col gap-2">
					<p className="text-sm bp-2">{t('workspace.remove_button')}?</p>
					<p>{t('workspace.remove_confirm', { name: `"${workspaceName}"` })}</p>
					<div className="text-tiny flex flex-row gap-4 p-2 items-center text-warning-500 border border-warning-500 rounded-2xl">
						<Icon name="TriangleAlert" size={48} strokeWidth={3} />

						<ul className="flex flex-col gap list-disc list-inside">
							<li>{t('workspace.remove_undone')}</li>
							<li>{t('workspace.remove_boards')}</li>
						</ul>
					</div>
					<Input
						variant="bordered"
						size="md"
						labelPlacement="outside"
						label={t('workspace.remove_label')}
						placeholder={''}
						value={checkName}
						onValueChange={value => setCheckName(value)}
						classNames={{
							label: 'text-tiny',
						}}
					/>
					<Button
						variant="solid"
						color={confirmed ? 'danger' : 'default'}
						isDisabled={!confirmed || remove.isPending}
						size="md"
						radius="sm"
						onPress={removeWorkspace}
						fullWidth
					>
						{t('workspace.remove_button')}
					</Button>
				</PopoverContent>
			</Popover>
		</>
	);
};
