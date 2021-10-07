import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { userIsLoggedIn } from "../api/Auth";

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
		return <div>Loading</div>;
	} else if (redirectToHomeRoute) {
		return <Redirect to="/home" />;
	} else {
		return <Redirect to="/login" />;
	}
};

export default DefaultRoute;
