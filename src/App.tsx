import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "./Snackbar";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import DefaultRoute from "./routes/DefaultRoute";
import TeamsRoute from "./routes/TeamsRoute";
import LoginRoute from "./routes/LoginRoute";
import SignupRoute from "./routes/SignupRoute";
import LogoutRoute from "./routes/LogoutRoute";
import MeetingRoute from "./routes/MeetingRoute";

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

            <AuthenticatedRoute path="/teams" component={TeamsRoute} />
            <AuthenticatedRoute path="/activity" component={TeamsRoute} exact />
            <AuthenticatedRoute path="/todo" component={TeamsRoute} exact />
            <AuthenticatedRoute path="/meetings/:id" component={MeetingRoute} noTeamsSidebar exact />
            <AuthenticatedRoute path="/logout" component={LogoutRoute} exact />
          </Switch>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
