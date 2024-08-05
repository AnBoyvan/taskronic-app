// import { AvatarGroup, Badge, TableCell, Tooltip } from '@nextui-org/react';
// import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

// import { Icon } from '@/components/ui/Icon';
// import { UserAvatar } from '@/components/ui/UserAvatar';
// import { IBoardWorkspaceField } from '@/interfaces/board.interface';
// import { IMember } from '@/interfaces/root.interface';
// import { ITaskWorkspaceField } from '@/interfaces/tasks.interface';
// import { getTasksQuantity } from '@/utils/tables/getTasksQuantity';

// export const boardsColumns: ITableColumn[] = [
// 	{
// 		key: 'title',
// 		label: 'label.name',
// 	},
// 	{
// 		key: 'members',
// 		label: 'common.members',
// 	},
// 	{
// 		key: 'tasks',
// 		label: 'nav.tasks',
// 	},
// 	{
// 		key: 'closed',
// 		label: 'common.closed',
// 	},
// 	{
// 		key: 'createdAt',
// 		label: 'common.created',
// 	},
// 	{
// 		key: 'updatedAt',
// 		label: 'common.updated',
// 	},
// ];

// const columnHelper = createColumnHelper<IBoardWorkspaceField>();
// export const boardsColumns = (
// 	userId: string,
// 	t: (key: TranslationKeys) => string,
// ): ColumnDef<IBoardWorkspaceField, any>[] => {
// 	return [
// 		columnHelper.accessor<'title', any>('title', {
// 			header: () => t('label.title'),
// 			cell: props => {
// 				const starred = props.row.original.starred.includes(userId);

// 				return (
// 					<Tooltip placement="bottom" content={props.row.original.description || props.getValue()}>
// 						<TableCell className="flex flex-row gap-2">
// 							<span>{props.getValue()}</span>
// 							<Icon
// 								name="Star"
// 								size={16}
// 								fill={starred ? '#f5a524' : undefined}
// 								className="text-yellow-500"
// 							/>
// 						</TableCell>
// 					</Tooltip>
// 				);
// 			},
// 		}),
// 		columnHelper.accessor<'tasks', ITaskWorkspaceField[]>('tasks', {
// 			header: () => t('nav.tasks'),
// 			cell: props => {
// 				const { active, completed } = getTasksQuantity(props.getValue());
// 				return <TableCell>{`${completed} / ${active}`}</TableCell>;
// 			},
// 		}),
// 		columnHelper.accessor<'members', IMember[]>('members', {
// 			header: () => t('common.members'),
// 			cell: props => {
// 				return (
// 					<TableCell>
// 						<AvatarGroup isBordered max={3} total={props.getValue().length}>
// 							{props.getValue().map(m => (
// 								<Badge
// 									key={m._id}
// 									placement="bottom-right"
// 									size="sm"
// 									isInvisible={!props.row.original.admins.includes(m._id)}
// 									classNames={{
// 										base: 'bg-transparent',
// 									}}
// 								>
// 									<UserAvatar
// 										name={m.name}
// 										avatarColor={m.avatarColor}
// 										avatarName={m.avatarName}
// 										small={true}
// 									/>
// 								</Badge>
// 							))}
// 						</AvatarGroup>
// 					</TableCell>
// 				);
// 			},
// 		}),
// 		columnHelper.accessor<'createdAt', string>('createdAt', {
// 			header: () => t('common.created'),
// 			cell: props => <TableCell>{props.getValue()}</TableCell>,
// 			sortingFn: 'datetime',
// 		}),
// 		columnHelper.accessor<'updatedAt', string>('updatedAt', {
// 			header: () => t('common.updated'),
// 			cell: props => <TableCell>{props.getValue()}</TableCell>,
// 			sortingFn: 'datetime',
// 		}),
// 		columnHelper.accessor<'_id', string>('_id', {
// 			header: '',
// 			cell: props => <TableCell>{props.getValue()}</TableCell>,
// 		}),
// 	];
// };
