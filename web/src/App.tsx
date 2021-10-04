import { BrowserRouter, Route, Switch } from "react-router-dom";
import DefaultRoute from "./routes/DefaultRoute";
import LoginRoute from "./routes/LoginRoute";

interface AppProps {}

const App: React.FC<AppProps> = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={DefaultRoute} />
					<Route path="/login" component={LoginRoute} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
