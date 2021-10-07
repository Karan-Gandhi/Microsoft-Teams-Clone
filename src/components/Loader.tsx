import AutorenewIcon from "@mui/icons-material/Autorenew";
import React from "react";

export interface DefaultLoaderProps {
	noPadding?: boolean;
	// iconSize?: "small" | "large" | "default";
}

const DefaultLoader: React.FC<DefaultLoaderProps> = ({ noPadding = false }) => {
	return (
		<div className={"w-full h-full flex items-center justify-center " + (!noPadding ? "p-5" : "")} title="spinning-loader">
			<AutorenewIcon className="animate-spin text-primary" />
		</div>
	);
};

export default DefaultLoader;
