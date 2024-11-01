type InfoSectionListProps = {
	items: { title: string; descr: string }[];
};

export const InfoSectionList: React.FC<InfoSectionListProps> = ({ items }) => {
	return (
		<ul className="pl-10 list-disc">
			{items.map((i, idx) => (
				<li key={idx} className="mt-2">
					<strong>{i.title}</strong>
					{i.descr}
				</li>
			))}
		</ul>
	);
};
