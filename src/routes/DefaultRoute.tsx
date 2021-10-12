import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { userIsLoggedIn } from "../api/Auth";
import DefaultLoader from "../components/DefaultLoader";

interface DefaultRouteProps {}

const DefaultRoute: React.FC<DefaultRouteProps> = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [redirectToHomeRoute, setRedirectToHomeRoute] = useState<boolean>(false);

	useEffect(() => {
		userIsLoggedIn().then(res => {
			setLoading(false);
			if (res) setRedirectToHomeRoute(true);
		});
	}, []);

	if (isLoading) {
		return (
			<div className="w-full h-screen">
				<DefaultLoader />
			</div>
		);
	} else if (redirectToHomeRoute) {
		return <Redirect to="/teams" />;
	} else {
		return <Redirect to="/login" />;
	}
};

export default DefaultRoute;
