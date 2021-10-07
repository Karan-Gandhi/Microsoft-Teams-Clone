export const validate = (
	errorCallback: (errorMessage: string) => void,
	email: string,
	password: string,
	name?: string,
	confirmPassword?: string
): boolean => {
	if (email.length === 0) {
		errorCallback("Please provide a email");
		return false;
	}

	if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
		errorCallback("Please provide a valid email");
		return false;
	}

	if (password.length === 0) {
		errorCallback("Please provide a password");
		return false;
	}

	if (password.length < 8) {
		errorCallback("The password must be at least 8 characters long");
		return false;
	}

	if (name) {
		if (name.length === 0) {
			errorCallback("Please provide a name");
			return false;
		}
	}

	if (confirmPassword) {
		if (password !== confirmPassword) {
			errorCallback("The given passwords don't match");
			return false;
		}
	}

	return true;
};
