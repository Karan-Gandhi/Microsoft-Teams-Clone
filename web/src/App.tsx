import { accessTokenIsValid, createUserWithEmailAndPassword, loginWithEmailAndPassword, logout, userIsLoggedIn } from "./api/Auth";

interface AppProps {}

const App: React.FC<AppProps> = () => {
	return (
		<div className="flex flex-col">
			<button
				onClick={() => {
					loginWithEmailAndPassword("test1@test.com", "pass@1234").then(data => console.log(data));
				}}
			>
				Login
			</button>
			<button
				onClick={() => {
					createUserWithEmailAndPassword("test", "test1@test.com", "pass@1234").then(data => console.log(data));
				}}
			>
				Create User
			</button>
			<button
				onClick={() => {
					userIsLoggedIn().then(data => console.log(data));
				}}
			>
				User is logged in
			</button>
			<button
				onClick={() => {
					accessTokenIsValid().then(data => console.log(data));
				}}
			>
				Access token is valid
			</button>
			<button
				onClick={() => {
					logout().then(data => console.log(data));
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default App;
