import { useTranslations } from 'next-intl';

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';

import { dueStatuses } from '@/configs/task-due-statuses.config';
import { Task } from '@/types/tasks.interface';
import { tasksByDueStatus } from '@/utils/helpers/tasksByDueStatus';

import { Chart } from './Chart';

type TasksPerDueDateProps = {
	tasks: Task[];
};

export const TasksPerDueDate: React.FC<TasksPerDueDateProps> = ({ tasks }) => {
	const t = useTranslations();

	const tasksByStatus = tasksByDueStatus(tasks);

	const chartData = dueStatuses.map(status => {
		return {
			label: t(status.label),
			tasks: tasksByStatus[status.value].length,
			color: status.hex,
		};
	});

	const CustomBar = (props: any) => {
		const { color, x, y, width, height } = props;

		return <rect x={x} y={y} width={width} height={height} fill={color} />;
	};

	return (
		<Chart title={t('board.per_due')}>
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
					<XAxis dataKey={'label'} tickLine={false} fontSize={12} />
					<YAxis allowDecimals={false} axisLine={false} tickLine={false} fontSize={12} width={20} />
					<Bar dataKey="tasks" shape={<CustomBar />} legendType="none">
						<LabelList dataKey="tasks" position="top" fontSize={12} />
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Chart>
	);
};
