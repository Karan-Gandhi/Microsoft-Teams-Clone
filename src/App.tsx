import { BrowserRouter, Route, Switch } from "react-router-dom";
import DefaultRoute from "./routes/DefaultRoute";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
import SignupRoute from "./routes/SignupRoute";
import { SnackbarProvider } from "./Snackbar";

interface AppProps {}

const App: React.FC<AppProps> = () => {
	return (
		<div>
			<BrowserRouter>
				<SnackbarProvider>
					<Switch>
						<Route path="/" component={DefaultRoute} exact />
						<Route path="/login" component={LoginRoute} exact />
						<Route path="/signup" component={SignupRoute} exact />
						<Route path="/home" component={HomeRoute} exact />
					</Switch>
				</SnackbarProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;