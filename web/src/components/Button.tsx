import React, { useState } from "react";

interface ButtonProps {
	type?: "submit" | "button" | "reset" | undefined;
	backgroundColor?: string;
	color?: string;
	hoverBackgroudColor?: string;
	hoverColor?: string;
	className?: string;
	hintText?: string;
}

const Button: React.FC<ButtonProps> = ({
	type,
	children,
	backgroundColor = "#4c70ff",
	color = "#fff",
	className = "",
	hoverBackgroudColor = "#3357e4",
	hoverColor = "#fff",
}) => {
	const [style, setStyle] = useState<React.CSSProperties>({ backgroundColor, color });

	return (
		<div>
			<button
				className={`px-8 py-3 transition duration-300 hover:shadow-lg rounded-lg font-medium w-full disabled:opacity-50 ${className}`}
				type={type}
				disabled
				style={style}
				onMouseEnter={() => {
					setStyle({ backgroundColor: hoverBackgroudColor, color: hoverColor });
				}}
				onMouseLeave={() => {
					setStyle({ backgroundColor, color });
				}}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
