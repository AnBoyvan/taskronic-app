interface ListWrapperProps {
	children: React.ReactNode;
}

export const ListWrapper: React.FC<ListWrapperProps> = ({ children }) => {
	return <li className="shrink-0 h-full w-64 select-none">{children}</li>;
};
