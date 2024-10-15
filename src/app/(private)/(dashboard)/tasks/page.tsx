import { PageContainer } from '@/components/layout/PageContainer';
import { taskService } from '@/services/task.service';
import { Task } from '@/types/tasks.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { UserTasks } from './_components/UserTasks';

export default async function TasksPage() {
	const { data } = await fetcher<Task[]>(taskService.findByUser());

	return (
		<PageContainer className="py-4 px-0">
			<UserTasks tasks={data || []} />
		</PageContainer>
	);
}
