import OptionsObject from "./OptionsObject";
import SnackbarKey from "./SnackbarKey";

export default interface SnackbarContextProvider {
  enqueueSnackbar: (message: string, options?: OptionsObject) => SnackbarKey;
  removeSnackbar: (key: string) => void;
}

export const snackbarContextDefaultValue: SnackbarContextProvider = {
  enqueueSnackbar: () => "",
  removeSnackbar: () => {},
};
