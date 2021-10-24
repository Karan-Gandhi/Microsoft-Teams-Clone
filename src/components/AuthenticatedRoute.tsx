import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { userIsLoggedIn } from "../api/Auth";
import Loader from "./DefaultLoader";
import MainSidebar from "./MainSidebar";
import TeamsSidebar from "./TeamsSidebar";

interface AuthenticatedRouteProps extends RouteProps {}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ component: Component, ...rest }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [teamsIsLoaded, setTeamsIsLoaded] = useState<boolean>(true);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  useEffect(() => {
    userIsLoggedIn()
      .then((status) => {
        setLoading(false);
        setRedirectToLogin(!status);
      })
      .catch((error) => {});
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading || !teamsIsLoaded)
          return (
            <div className="h-screen">
              <Loader />
            </div>
          );
        if (redirectToLogin) return <Redirect to="/login" />;
        else if (!redirectToLogin && !isLoading)
          return (
            <div className="w-screen h-screen flex text-white">
              <MainSidebar />
              <TeamsSidebar onLoaded={() => setTeamsIsLoaded(true)} />
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
