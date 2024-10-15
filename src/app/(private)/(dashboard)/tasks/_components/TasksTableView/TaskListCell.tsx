type TaskListCellProps = {
	listLabel?: string;
};

export const TaskListCell: React.FC<TaskListCellProps> = ({ listLabel }) => {
	return <span className="w-full text-nowrap truncate">{listLabel ? listLabel : ''}</span>;
};
