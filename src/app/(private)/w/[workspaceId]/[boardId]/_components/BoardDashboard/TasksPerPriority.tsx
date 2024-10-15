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

import { priorityConfig } from '@/configs/priority-config';
import { Priority } from '@/types/root.interface';
import { Task } from '@/types/tasks.interface';

import { Chart } from './Chart';

type TasksPerPriorityProps = {
	tasks: Task[];
};

export const TasksPerPriority: React.FC<TasksPerPriorityProps> = ({ tasks }) => {
	const t = useTranslations();

	const tasksCount = (priority: Priority): number => {
		return tasks.filter(task => task.priority === priority).length;
	};

	const chartData = priorityConfig.map(option => {
		return {
			label: t(option.label),
			tasks: tasksCount(option.value),
			color: option.hex,
		};
	});

	const CustomBar = (props: any) => {
		const { color, x, y, width, height } = props;

		return <rect x={x} y={y} width={width} height={height} fill={color} />;
	};

	return (
		<Chart title={t('board.per_priority')}>
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
