import { auth } from '@/auth';
import { Update } from '@/components/tmp/Update';

export default async function CalendarPage() {
	const session = await auth();

	return (
		<section>
			<div className="text-xs">{JSON.stringify(session)}</div>
			<Update />
		</section>
	);
}
