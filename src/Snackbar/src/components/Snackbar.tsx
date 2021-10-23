import { useCallback, useEffect, useState } from "react";
import "../assets/styles/snackbar.css";
import SnackbarKey from "../types/SnackbarKey";
import { isSmScreen } from "../utils/BrowserUtils";

interface SnackbarProps {
  id: SnackbarKey;
  message: string;
  visibilityDuration: number;
  keepOnScreen?: boolean;
  showActionButton?: boolean;
  onActionPerformed?: (key: string) => any;
  dismissOnActionButtonClicked?: boolean;
  actionText?: string;
  yDispl: number;
  removeSnackbar: (key: string) => void;
  setExitAnimation: (key: string, func: () => void) => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  id,
  message,
  visibilityDuration,
  keepOnScreen = false,
  showActionButton = true,
  onActionPerformed = () => {},
  dismissOnActionButtonClicked = true,
  actionText = "OK",
  yDispl,
  removeSnackbar,
  setExitAnimation,
}) => {
  const [opacity, setOpacity] = useState<number>(1);
  const exitAnimation = useCallback<() => void>(() => setOpacity(0), [setOpacity]);

  useEffect(() => {
    setExitAnimation(id, exitAnimation);
  }, [id, exitAnimation, setExitAnimation]);

  useEffect(() => {
    if (!keepOnScreen) {
      let timeout1: NodeJS.Timeout, timeout2: NodeJS.Timeout;

      timeout1 = setTimeout(() => {
        exitAnimation();
        timeout2 = setTimeout(() => removeSnackbar(id), 350);
      }, visibilityDuration);

      return () => {
        clearInterval(timeout1);
        clearInterval(timeout2);
      };
    }
  }, [visibilityDuration, keepOnScreen, exitAnimation, removeSnackbar, id]);

  return (
    <div
      className={`text-sm px-8 flex flex-row py-2 rounded text-white mx-8 my-4 items-center fixed bottom-0 left-0 transition duration-300 fade shadow-xl opacity-${
        opacity * 100
      }`}
      style={{
        backgroundColor: "#202124",
        transform: `translate(0, -${yDispl}em)`,
        animation: "fade 0.5s",
        transition: "300ms",
        width: isSmScreen() ? "calc(100% - 4rem)" : "auto",
      }}
    >
      <div className="flex-grow">
        <span>{message}</span>
      </div>
      {showActionButton && (
        <div
          className="font-medium ml-4 cursor-pointer relative flex items-center"
          onClick={() => {
            if (dismissOnActionButtonClicked) {
              exitAnimation();
              setTimeout(() => removeSnackbar(id), 350);
            }
            onActionPerformed(id);
          }}
          style={{ color: "#8ab4f8" }}
        >
          <span className="snackbar-action-button py-2 px-2">{actionText}</span>
        </div>
      )}
    </div>
  );
};

export default Snackbar;
