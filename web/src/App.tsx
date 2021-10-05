import { BrowserRouter, Route, Switch } from "react-router-dom";
import DefaultRoute from "./routes/DefaultRoute";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";

interface AppProps {}

const App: React.FC<AppProps> = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={DefaultRoute} exact />
					<Route path="/login" component={LoginRoute} exact />
					<Route path="/home" component={HomeRoute} exact />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
