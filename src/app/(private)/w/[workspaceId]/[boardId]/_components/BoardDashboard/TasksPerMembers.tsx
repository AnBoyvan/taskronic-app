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

import { Member } from '@/types/root.interface';
import { Task } from '@/types/tasks.interface';
import { getMaxStringWidth } from '@/utils/helpers/getMaxStringWidth';

import { Chart } from './Chart';

type TasksPerMembersProps = {
	tasks: Task[];
	members: Member[];
};

export const TasksPerMembers: React.FC<TasksPerMembersProps> = ({ tasks, members }) => {
	const t = useTranslations();

	const tasksCount = (memberId: string): number => {
		return tasks.filter(task => task.members.some(member => member._id === memberId)).length;
	};

	const names = members.map(member => member.name);

	const nameWidth = getMaxStringWidth(names, 12);

	const chartData = members.map(member => {
		return {
			label: member.name,
			tasks: tasksCount(member._id),
		};
	});

	return (
		<Chart title={t('board.per_member')}>
			<ResponsiveContainer width="100%">
				<BarChart
					data={chartData}
					layout="vertical"
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" horizontal={false} />
					<XAxis type="number" dataKey="tasks" fontSize={12} tickLine={false} />
					<YAxis
						type="category"
						dataKey={'label'}
						allowDecimals={false}
						axisLine={false}
						tickLine={false}
						fontSize={10}
						width={nameWidth}
						textAnchor="end"
						style={{
							textWrap: 'nowrap',
							textOverflow: 'ellipsis',
						}}
					/>
					<Bar dataKey="tasks" fill="#006FEE" legendType="none">
						<LabelList dataKey="tasks" position="right" fontSize={12} />
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Chart>
	);
};
