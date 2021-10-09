import { useCallback, useEffect, useState } from "react";
import Textfield from "../components/Textfield";
import Button from "../components/Button";
import { Link, Redirect } from "react-router-dom";
import { useSnackbar } from "../Snackbar";
import { validate } from "../utils/AuthUtils";
import { loginWithEmailAndPassword, userIsLoggedIn } from "../api/Auth";
import DefaultLoader from "../components/DefaultLoader";

interface LoginRouteProps {}

const LoginRoute: React.FC<LoginRouteProps> = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [isLoading, setLoading] = useState<boolean>(true);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		userIsLoggedIn()
			.then(status => {
				setLoading(false);
				setUserLoggedIn(status);
			})
			.catch(error => console.log(error));
	}, []);

	const handleSubmit = useCallback(
		(e: any) => {
			e.preventDefault();
			const validationSuccess = validate(errorMessage => enqueueSnackbar(errorMessage), email, password);

			if (validationSuccess) {
				loginWithEmailAndPassword(email, password)
					.then(status => setUserLoggedIn(status))
					.catch(error => {
						if (error.message === "Network Error") return enqueueSnackbar("No internet connection");
						enqueueSnackbar("Invalid email or password");
					});
			}
		},
		[enqueueSnackbar, email, password]
	);

	if (isLoading) {
		return (
			<div className="w-full h-screen">
				<DefaultLoader />
			</div>
		);
	}

	if (userLoggedIn) {
		return <Redirect to="/teams" />;
	}

	return (
		<div className="flex w-full h-screen items-center justify-center bg-white">
			<div className="w-full lg:w-1/3 lg:min-w-128 bg-white h-fit px-16 py-14 flex flex-col justify-center items-center lg:border lg:rounded-lg">
				<div className="flex flex-col items-center min-w-full">
					<div className="text-4xl font-bold mb-8">
						<span>Login</span>
					</div>
					<form onSubmit={handleSubmit} className="w-full flex gap-2 flex-col">
						<div>
							<Textfield
								onChange={value => {
									setEmail(value);
								}}
								label="Email"
								placeholder="example@domain.com"
							/>
						</div>
						<div>
							<Textfield
								type="password"
								onChange={value => {
									setPassword(value);
								}}
								label="Password"
								placeholder="Password"
								hintText="Must be 8 characters at least"
							/>
						</div>
						<div className="mb-2 mt-2	flex justify-end">
							<div className="font-medium ml-8" style={{ color: "#000" }}>
								<Link to="/signup">
									<span className="nav-link">Don't have a account?</span>
								</Link>
							</div>
						</div>
						<div>
							<Button type="submit">Login</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginRoute;
