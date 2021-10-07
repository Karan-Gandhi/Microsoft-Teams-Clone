import { useCallback, useEffect, useState } from "react";
import Textfield from "../components/Textfield";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useSnackbar } from "../Snackbar";
import { validate } from "../utils/AuthUtils";

interface LoginRouteProps {}

const LoginRoute: React.FC<LoginRouteProps> = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = useCallback(
		(e: any) => {
			e.preventDefault();
			// console.log("Hello world");
			const validationSuccess = validate(
				errorMessage => {
					enqueueSnackbar(errorMessage);
				},
				email,
				password
			);

			if (validationSuccess) {
				// login
			}
		},
		[enqueueSnackbar, email, password]
	);

	return (
		<div className="flex w-full h-screen items-center justify-center bg-white">
			<div className="w-1/3 min-w-fit bg-white h-fit px-16 py-14 flex flex-col justify-center items-center border rounded-lg">
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
						<div className="mb-2 mt-2	flex">
							<div className="flex items-center gap-3 cursor-pointer flex-grow">
								<input id="remember-me-checkbox" type="checkbox" />
								<label htmlFor="remember-me-checkbox" className="font-medium cursor-pointer" style={{ color: "#4a4d50" }}>
									Remember Me
								</label>
							</div>
							<div className="font-medium ml-8" style={{ color: "#000" }}>
								<Link to="/signup">
									<span className="nav-link">Already have a account?</span>
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
