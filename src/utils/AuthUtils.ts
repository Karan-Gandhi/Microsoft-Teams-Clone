import { hashString } from "./BrowserUtils";

const COLORS = [
  { b: "ef9a9a", t: "b71c1c" },
  { b: "9fa8da", t: "1a237e" },
  { b: "90caf9", t: "0d47a1" },
  { b: "80cbc4", t: "004d40" },
  { b: "a5d6a7", t: "1b5e20" },
  { b: "ffcc80", t: "e65100" },
  { b: "ffab91", t: "bf360c" },
  { b: "bcaaa4", t: "3e2723" },
];

export const validate = (
  errorCallback: (errorMessage: string) => void,
  email: string,
  password: string,
  name?: string,
  confirmPassword?: string
): boolean => {
  if (typeof name === "string") {
    if (name.length === 0) {
      errorCallback("Please provide a name");
      return false;
    }
  }

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

  if (confirmPassword && password.length < 8) {
    errorCallback("The password must be at least 8 characters long");
    return false;
  }

  if (typeof confirmPassword === "string") {
    if (password !== confirmPassword) {
      errorCallback("The given passwords don't match");
      return false;
    }
  }

  return true;
};

export const getAvatarSrc = (title: string, size?: number) => {
  const hash = hashString(title);
  if (!size) size = 512;
  const index = hash % COLORS.length;
  title = title.replaceAll(" ", "%20");
  return `https://ui-avatars.com/api/?name=${title}&font-size=0.33&size=${size}&background=${COLORS[index].b}&color=${COLORS[index].t}`;
};
