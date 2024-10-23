import { PageContainer } from '@/components/layout/PageContainer';
import { Schedule } from '@/components/shared/Schedule';
import { taskService } from '@/services/task.service';
import { Task } from '@/types/tasks.interface';
import { fetcher } from '@/utils/helpers/fetcher';

export default async function CalendarPage() {
	const { data } = await fetcher<Task[]>(taskService.findByUser());

	const withDueDate = data?.filter(({ dueDate }) => Boolean(dueDate)) || [];

	return (
		<PageContainer scroll>
			<Schedule tasks={withDueDate} />
		</PageContainer>
	);
}
