import React from "react";
import SnackbarContextProvider, { snackbarContextDefaultValue } from "./types/SnackbarContextProvider";

const SnackbarContext = React.createContext<SnackbarContextProvider>(snackbarContextDefaultValue);

export default SnackbarContext;
