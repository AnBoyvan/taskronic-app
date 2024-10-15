import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';

import { List } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { getListColor } from '@/utils/helpers/getListColor';
import { sorter } from '@/utils/helpers/sorter';

import { Chart } from './Chart';

type TasksPerListProps = {
	tasks: Task[];
	lists: List[];
};

export const TasksPerList: React.FC<TasksPerListProps> = ({ tasks, lists }) => {
	const t = useTranslations();
	const { theme } = useTheme();
	const sortedLists = sorter(lists, 'order', 'asc');

	const tasksCount = (listId: string): number => {
		return tasks.filter(task => task.list === listId).length;
	};

	const chartData = sortedLists.map(list => {
		return {
			label: list.label,
			tasks: tasksCount(list._id),
			color: getListColor(list.bgColor, 'hex', theme),
		};
	});

	const CustomBar = (props: any) => {
		const { color, x, y, width, height } = props;

		return <rect x={x} y={y} width={width} height={height} fill={color} />;
	};

	return (
		<Chart title={t('board.per_list')}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={chartData}
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" vertical={false} />
					<XAxis dataKey="label" tickLine={false} fontSize={12} />

					<YAxis allowDecimals={false} axisLine={false} tickLine={false} fontSize={12} width={20} />
					<Bar dataKey="tasks" shape={<CustomBar />} legendType="none">
						<LabelList dataKey="tasks" position="top" fontSize={12} />
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Chart>
	);
};
