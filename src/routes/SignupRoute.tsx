import { useCallback, useEffect, useState } from "react";
import Textfield from "../components/Textfield";
import Button from "../components/Button";
import { Link, Redirect } from "react-router-dom";
import { useSnackbar } from "../Snackbar";
import { validate } from "../utils/AuthUtils";
import { createUserWithEmailAndPassword, userIsLoggedIn } from "../api/Auth";

interface SignupRouteProps {}

const SignupRoute: React.FC<SignupRouteProps> = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		userIsLoggedIn()
			.then(status => {
				setUserLoggedIn(status);
			})
			.catch(error => console.log(error));
	}, []);

	const handleSubmit = useCallback(
		(e: any) => {
			e.preventDefault();
			const validationSuccess = validate(
				errorMessage => enqueueSnackbar(errorMessage),
				email,
				password,
				name,
				confirmPassword
			);

			if (validationSuccess) {
				createUserWithEmailAndPassword(name, email, password)
					.then(status => setUserLoggedIn(status || false))
					.catch(error => {
						if (error.message === "Network Error")
							return enqueueSnackbar("No internet connection");
						enqueueSnackbar(error.message);
					});
			}
		},
		[enqueueSnackbar, email, password, name, confirmPassword]
	);

	if (userLoggedIn) {
		return <Redirect to="/teams" />;
	}

	return (
		<div className="flex w-full h-screen items-center justify-center">
			<div className="lg:w-1/3 lg:min-w-128 w-full bg-white h-fit px-16 py-14 flex flex-col justify-center items-center lg:border lg:rounded-lg">
				<div className="flex flex-col items-center min-w-full">
					<div className="text-4xl font-bold mb-8">
						<span>Sign up</span>
					</div>
					<form onSubmit={handleSubmit} className="w-full flex gap-2 flex-col">
						<div>
							<Textfield
								onChange={value => {
									setName(value);
								}}
								label="Name"
								placeholder="Name"
							/>
						</div>
						<div>
							<Textfield
								onChange={value => {
									setEmail(value);
								}}
								type="email"
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
						<div>
							<Textfield
								type="password"
								onChange={value => {
									setConfirmPassword(value);
								}}
								label="Confirm Password"
								placeholder="Confirm Password"
							/>
						</div>
						<div className="mb-2 mt-2	flex justify-end">
							<div className="font-medium ml-8" style={{ color: "#000" }}>
								<Link to="/login">
									<span className="nav-link">Already have a account?</span>
								</Link>
							</div>
						</div>
						<div>
							<Button type="submit">Sign up</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignupRoute;
