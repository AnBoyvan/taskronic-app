import { ReactNode } from 'react';

export const BoardListWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="w-full grid gap-2 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] px-4 lg:px-8 pb-4 lg:pb-8">
			{children}
		</div>
	);
};
