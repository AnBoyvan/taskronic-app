// import { useTranslations } from 'next-intl';

// import {
// 	getKeyValue,
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableColumn,
// 	TableHeader,
// 	TableRow,
// } from '@nextui-org/react';

// import { IBoardWorkspaceField } from '@/interfaces/board.interface';

// import { boardsColumns } from './boardsColumns';

// type BoardsTableProps = {
// 	boards: IBoardWorkspaceField[];
// };

// export const BoardsTable: React.FC<BoardsTableProps> = ({ boards }) => {
// 	const t = useTranslations();

// 	return (
// 		<Table aria-label={t('nav.boards')}>
// 			<TableHeader columns={boardsColumns}>
// 				{column => <TableColumn key={column.key}>{column.label}</TableColumn>}
// 			</TableHeader>
// 			<TableBody items={boards} emptyContent={t('workspace.no_boards')}>
// 				{item => (
// 					<TableRow key={item._id}>
// 						{columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
// 					</TableRow>
// 				)}
// 			</TableBody>
// 		</Table>
// 	);
// };
