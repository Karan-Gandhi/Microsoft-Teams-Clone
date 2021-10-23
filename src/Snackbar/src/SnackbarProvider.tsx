import React from "react";
import Snackbar from "./components/Snackbar";
import SnackbarContainer from "./components/SnackbarContainer";

import SnackbarContext from "./SnackbarContext";
import OptionsObject from "./types/OptionsObject";
import SnackbarObject, { DEFAULT_VISIBILITY_DURATION, MAX_VISIBILITY_DURATION } from "./types/SnackbarObject";
import SnackbarContextProvider from "./types/SnackbarContextProvider";
import SnackbarKey from "./types/SnackbarKey";

interface SnackbarProviderProps {
  children: React.ReactNode | React.ReactNode[];
  preventDuplicate?: boolean;
}

interface SnackbarProviderState {
  snackbars: SnackbarObject[];
  contextValue: SnackbarContextProvider;
  snackbarExitAnimations: { [key: SnackbarKey]: () => void };
}

class SnackbarProvider extends React.Component<SnackbarProviderProps, SnackbarProviderState> {
  constructor(props: SnackbarProviderProps) {
    super(props);

    this.enqueueSnackbar = this.enqueueSnackbar.bind(this);
    this.removeSnackbar = this.removeSnackbar.bind(this);
    this.removeSnackbarFromArray = this.removeSnackbarFromArray.bind(this);
    this.setExitAnimation = this.setExitAnimation.bind(this);

    this.state = {
      snackbars: [],
      contextValue: {
        enqueueSnackbar: this.enqueueSnackbar,
        removeSnackbar: this.removeSnackbar,
      },
      snackbarExitAnimations: {},
    };
  }

  enqueueSnackbar(message: string, options: OptionsObject = {}): SnackbarKey {
    const key: SnackbarKey = new Date().getTime().toString() + "-" + Math.round(Math.random() * 1e6).toString();
    const { preventDuplicate = false, keepOnScreen = false, visibilityDuration = DEFAULT_VISIBILITY_DURATION, ...otherOptions } = options;

    const snackbar: SnackbarObject = {
      key,
      message,
      visibilityDuration: keepOnScreen ? MAX_VISIBILITY_DURATION : visibilityDuration,
      keepOnScreen,
      ...otherOptions,
    };

    if (preventDuplicate || this.props.preventDuplicate) {
      const snackbarDoesExist: boolean = this.state.snackbars.findIndex((item: SnackbarObject): boolean => item.message === message) > -1;

      if (snackbarDoesExist) {
        return key;
      }
    }

    this.setState((state) => {
      const newState: SnackbarProviderState = Object.assign({}, state);
      newState.snackbars = [snackbar, ...state.snackbars];
      return newState;
    });

    return key;
  }

  removeSnackbar(key: SnackbarKey): void {
    this.state.snackbarExitAnimations[key]();
    this.removeSnackbarFromArray(key);
  }

  removeSnackbarFromArray(key: SnackbarKey): void {
    this.setState((state) => {
      const newState: SnackbarProviderState = Object.assign({}, state);
      const index = newState.snackbars.findIndex((item: SnackbarObject) => item.key === key);
      newState.snackbars.splice(index, 1);
      return newState;
    });
  }

  setExitAnimation(key: string, func: () => void): void {
    this.setState((state) => {
      const newState = Object.assign({}, state);
      newState.snackbarExitAnimations[key] = func;
      return newState;
    });
  }

  render(): JSX.Element {
    return (
      <SnackbarContext.Provider value={this.state.contextValue}>
        {this.props.children}
        <SnackbarContainer>
          {this.state.snackbars.map((snackbar, idx) => (
            <Snackbar
              {...snackbar}
              yDispl={idx * 5}
              id={snackbar.key}
              removeSnackbar={this.removeSnackbarFromArray}
              setExitAnimation={this.setExitAnimation}
            />
          ))}
        </SnackbarContainer>
      </SnackbarContext.Provider>
    );
  }
}

export default SnackbarProvider;
