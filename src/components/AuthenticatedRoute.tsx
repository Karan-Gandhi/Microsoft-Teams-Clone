import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { userIsLoggedIn } from "../api/Auth";
import Loader from "./Loader";
import MainSidebar from "./MainSidebar";

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
				return (
					<div className="w-screen h-screen flex">
						<div className="flex">
							<MainSidebar />
						</div>
						<div className="w-full h-full">
							{/* @ts-ignore */}
							<Component {...props} />
						</div>
					</div>
				);
			}}
		/>
	);
};

export default AuthenticatedRoute;
