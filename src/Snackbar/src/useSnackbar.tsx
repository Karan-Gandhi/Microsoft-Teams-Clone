import { useContext } from "react";
import SnackbarContext from "./SnackbarContext";
import SnackbarContextProvider from "./types/SnackbarContextProvider";

const useSnackbar = (): SnackbarContextProvider => useContext(SnackbarContext);

export default useSnackbar;
