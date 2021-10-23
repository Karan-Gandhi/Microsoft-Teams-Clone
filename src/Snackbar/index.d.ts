import React from "react";
import SnackbarContextProvider from "./src/types/SnackbarContextProvider";

export class SnackbarProvider extends React.Component<SnackbarProviderProps> {
  enqueueSnackbar: SnackbarContextProvider["enqueueSnackbar"];
  removeSnackbar: SnackbarContextProvider["removeSnackbar"];
}

export function useSnackbar(): SnackbarContextProvider;
