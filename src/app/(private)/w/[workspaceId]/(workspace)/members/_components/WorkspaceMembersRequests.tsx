'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Button, Divider, Popover, PopoverContent, PopoverTrigger, User } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { colorVariants } from '@/constants/color-variants.constants';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';
import { Member } from '@/types/root.interface';

type WorkspaceMembersRequestsProps = {
	requests: Member[];
	workspaceId: string;
};

export const WorkspaceMembersRequests: React.FC<WorkspaceMembersRequestsProps> = ({
	requests,
	workspaceId,
}) => {
	const t = useTranslations();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { acceptRequest, declineRequest } = useWorkspaceMembers();

	const noRequests = requests.length < 1;

	return (
		<Popover
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			shouldFlip
			placement="bottom"
			offset={0}
			shadow="lg"
			radius="sm"
		>
			<PopoverTrigger>
				<Button
					variant="bordered"
					radius="sm"
					color={noRequests ? 'default' : 'success'}
					isDisabled={noRequests}
					className="min-w-36 lg:w-full"
				>
					{`${t('workspace.join_requests')} (${requests.length})`}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 max-h-[400px] overflow-hidden justify-start">
				<ul className="flex flex-col p-2 overflow-auto">
					{requests.map(({ _id, name, email, initials, avatar }) => (
						<li key={_id} className="flex flex-col p-2 gap-2">
							<div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-center">
								<User
									name={name}
									description={email}
									className="min-w-64 justify-start"
									avatarProps={{
										name: initials,
										classNames: {
											base: `${colorVariants[avatar]}`,
										},
									}}
								/>
								<div className="flex flex-row gap-2">
									<Button
										size="sm"
										variant="solid"
										color="success"
										startContent={<Icon name="Check" size={12} />}
										onPress={() => acceptRequest.mutate({ workspaceId, userId: _id })}
										isDisabled={acceptRequest.isPending || declineRequest.isPending}
									>
										{t('actions.accept')}
									</Button>
									<Button
										size="sm"
										variant="bordered"
										color="danger"
										startContent={<Icon name="X" size={12} />}
										onPress={() => declineRequest.mutate({ workspaceId, userId: _id })}
										isDisabled={acceptRequest.isPending || declineRequest.isPending}
									>
										{t('actions.decline')}
									</Button>
								</div>
							</div>
							<Divider />
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	);
};
