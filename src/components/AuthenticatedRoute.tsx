import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { userIsLoggedIn } from "../api/Auth";
import Loader from "./Loader";

interface AuthenticatedRouteProps extends RouteProps {}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ component: Component, ...rest }) => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

	useEffect(() => {
		userIsLoggedIn().then(status => {
			setLoading(false);
			setRedirectToLogin(!status);
		});
	}, []);

	return (
		<Route
			{...rest}
			render={props => {
				if (isLoading)
					return (
						<div className="h-screen">
							<Loader />
						</div>
					);
				if (redirectToLogin) return <Redirect to="/" />;
				// @ts-ignore
				return <Component {...props} />;
			}}
		/>
	);
};

export default AuthenticatedRoute;
