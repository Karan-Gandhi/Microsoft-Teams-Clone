import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { logout } from "../api/Auth";
import DefaultLoader from "../components/DefaultLoader";

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
	const [isLodggedOut, setLoggedOut] = useState<boolean>(false);

	useEffect(() => {
		logout().then(() => setLoggedOut(true));
	}, []);

	if (isLodggedOut) return <Redirect to="/" />;

	return (
		<div className="w-full h-screen">
			<DefaultLoader />
		</div>
	);
};

export default Logout;
