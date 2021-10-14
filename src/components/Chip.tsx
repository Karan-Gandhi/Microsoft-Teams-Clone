import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

interface ChipProps {
	title?: string;
	noIcon?: boolean;
	noBg?: boolean;
	className?: string;
	onClose?: () => void;
	height?: number;
	style?: React.CSSProperties;
}

const Chip: React.FC<ChipProps> = ({
	title,
	onClose,
	noIcon,
	noBg,
	className = "",
	height = 10,
	style = {},
	children,
}) => {
	const [currentStyle, setCurrentStyle] = useState<React.CSSProperties>({ backgroundColor: "#00000033" });

	return (
		<div
			className={`h-${height} flex items-center px-4 rounded-full cursor-pointer gap-2 text-normal ${
				!noBg ? "" : ""
			} transition ${className}`}
			onClick={onClose}
			onMouseEnter={() => setCurrentStyle({ backgroundColor: "#00000099" })}
			onMouseLeave={() => setCurrentStyle({ backgroundColor: "#00000033" })}
			style={{ ...style, ...currentStyle }}
		>
			{title && <span>{title}</span>}
			{children}
			{!noIcon && <CloseIcon style={{ fontSize: 15 }} />}
		</div>
	);
};

export default Chip;
