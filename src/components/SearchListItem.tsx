interface SearchListItemProps {
	name: string;
	email: string;
	onClick?: () => any;
}

const SearchListItem: React.FC<SearchListItemProps> = ({ name, email, onClick }) => {
	return (
		<div className="flex px-4 hover:bg-black cursor-pointer py-2 gap-2 items-center" onClick={onClick}>
			<div className="font-bold">
				<span>{name}</span>
			</div>
			<div className="h-1.5 w-1.5 bg-white rounded-full"></div>
			<div>
				<span>{email}</span>
			</div>
		</div>
	);
};

export default SearchListItem;
