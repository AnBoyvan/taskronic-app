import { getTranslations } from 'next-intl/server';

import { PageContainer } from '@/components/layout/PageContainer';
import { taskService } from '@/services/task.service';
import { Task } from '@/types/tasks.interface';
import { fetcher } from '@/utils/helpers/fetcher';

import { UserTasks } from './_components/UserTasks';

export default async function TasksPage() {
	const { data } = await fetcher<Task[]>(taskService.findByUser());
	const t = await getTranslations();

	return (
		<PageContainer className="py-4 px-0">
			{data && data?.length > 0 ? (
				<UserTasks tasks={data} />
			) : (
				<p className="text-center text-divider/50 mt-8">{t('task.no_tasks')}</p>
			)}
		</PageContainer>
	);
}
