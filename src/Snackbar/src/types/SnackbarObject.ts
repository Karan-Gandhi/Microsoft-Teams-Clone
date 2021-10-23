export const DEFAULT_VISIBILITY_DURATION = 3000;
export const MAX_VISIBILITY_DURATION = -1;

export default interface SnackbarObject {
  key: string;
  message: string;
  visibilityDuration: number;
  preventDuplicate?: boolean;
  keepOnScreen?: boolean;
  showActionButton?: boolean;
  onActionPerformed?: (key: string) => any;
  dismissOnActionButtonClicked?: boolean;
}
