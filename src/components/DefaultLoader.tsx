import AutorenewIcon from "@mui/icons-material/Autorenew";
import React from "react";

export interface DefaultLoaderProps {
	noPadding?: boolean;
}

const DefaultLoader: React.FC<DefaultLoaderProps> = ({ noPadding = false }) => {
	return (
		<div
			className={
				"w-full h-full flex items-center justify-center text-white " +
				(!noPadding ? "p-5" : "")
			}
			title="spinning-loader"
		>
			<AutorenewIcon className="animate-spin text-primary" fontSize="large" />
		</div>
	);
};

export default DefaultLoader;
