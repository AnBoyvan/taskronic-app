import { ReactNode } from 'react';

export const BoardListWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
			{children}
		</div>
	);
};
