import { Route, RouteProps } from "react-router";

interface AuthenticatedRouteProps extends RouteProps {}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				return <div></div>;
			}}
		/>
	);
};

export default AuthenticatedRoute;
