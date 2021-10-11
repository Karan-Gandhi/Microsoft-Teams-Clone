interface TeamHeaderItemProps {
	label: string;
	active?: boolean;
	onClick?: () => any;
}

const TeamHeaderItem: React.FC<TeamHeaderItemProps> = ({
	label,
	active = false,
	onClick,
}) => {
	return (
		<div
			onClick={onClick}
			className={`text-lg cursor-pointer font-medium transition duration-200`}
			style={active ? {} : { color: "#adadad" }}
		>
			<div className="py-2 px-2">
				<span>{label}</span>
			</div>
			{active && (
				<div
					className="w-full h-1"
					style={{ backgroundColor: "#9ea2ff" }}
				></div>
			)}
		</div>
	);
};

export default TeamHeaderItem;
