'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

import { toast } from 'sonner';

import { Icon } from '@/components/ui/Icon';
import { useUserEdit } from '@/hooks/useUserEdit';
import { userService } from '@/services/user.service';
import { Board } from '@/types/board.interface';
import { Workspace } from '@/types/workspace.interface';

import { OnlyAdminList } from './OnlyAdminList';

export const DeleteAccount = () => {
	const t = useTranslations();
	const { removeAccount } = useUserEdit();

	const [canDelete, setCanDelete] = useState<boolean>(false);

	const { data, isFetching, refetch, error } = useQuery<{
		workspaces: Workspace[];
		boards: Board[];
	}>({
		queryKey: ['check'],
		queryFn: userService.deleteCheck,
		refetchOnWindowFocus: false,
	});

	const isOnlyAdmin = Boolean(data && (data?.workspaces.length > 0 || data?.boards.length > 0));

	useEffect(() => {
		if (data && !isOnlyAdmin) {
			setCanDelete(true);
		}

		if (error) {
			toast.error(error.message, { closeButton: false });
		}
	}, [data]);

	return (
		<div className="w-full max-w-2xl flex flex-col gap-4 items-center mx-auto py-4 lg:py-8">
			<div className="flex flex-row items-center gap-4 text-danger border-2 border-danger rounded-lg p-4">
				<Icon name="TriangleAlert" size={32} className="min-w-8 min-h-8" />
				<div>{t('user.delete_warn')}</div>
			</div>
			<p className="fomt-medium">{t('user.delete_check')}</p>
			<Button
				variant="bordered"
				radius="sm"
				color="warning"
				isLoading={isFetching}
				spinnerPlacement="end"
				onPress={() => refetch()}
			>
				{t('actions.check')}
			</Button>
			{data && isOnlyAdmin && (
				<>
					<p className="w-full text-start text-danger">{t('user.delete_admins')}</p>
					<OnlyAdminList data={data} />
				</>
			)}
			{canDelete && (
				<>
					<p>{t('user.delete_allow')}</p>
					<Button
						variant="solid"
						color="danger"
						isDisabled={removeAccount.isPending}
						isLoading={removeAccount.isPending}
						spinnerPlacement="end"
						onPress={() => removeAccount.mutate()}
					>
						{t('user.delete')}
					</Button>
				</>
			)}
		</div>
	);
};
