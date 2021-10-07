import { logout } from "../api/Auth";
import Button from "../components/Button";

interface HomeRouteProps {}

const HomeRoute: React.FC<HomeRouteProps> = () => {
	return (
		<div className="flex items-center justify-center w-full h-screens">
			<Button onClick={() => logout()}>logout</Button>
			<div>Hello world</div>
		</div>
	);
};

export default HomeRoute;
