import React, { useState } from "react";

interface ButtonProps {
	type?: "submit" | "button" | "reset" | undefined;
	backgroundColor?: string;
	color?: string;
	hoverBackgroudColor?: string;
	hoverColor?: string;
	className?: string;
	noPadding?: boolean;
	noRounded?: boolean;
	onClick?: () => any;
}

const Button: React.FC<ButtonProps> = ({
	type,
	children,
	backgroundColor = "#4c70ff",
	color = "#fff",
	className = "",
	hoverBackgroudColor = "#3357e4",
	hoverColor = "#fff",
	noPadding = false,
	noRounded = false,
	onClick = () => {},
}) => {
	const [style, setStyle] = useState<React.CSSProperties>({
		backgroundColor,
		color,
	});

	return (
		<div>
			<button
				className={`${
					noPadding ? "" : "px-8 py-3"
				} transition duration-300 hover:shadow-lg ${
					noRounded ? "" : "rounded-lg"
				} font-medium w-full ${className}`}
				type={type}
				style={style}
				onMouseEnter={() => {
					setStyle({ backgroundColor: hoverBackgroudColor, color: hoverColor });
				}}
				onMouseLeave={() => {
					setStyle({ backgroundColor, color });
				}}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
