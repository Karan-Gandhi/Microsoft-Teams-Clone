export default interface OptionsObject {
  preventDuplicate?: boolean;
  keepOnScreen?: boolean;
  visibilityDuration?: number;
  showActionButton?: boolean;
  onActionPerformed?: (key: string) => any;
  dismissOnActionButtonClicked?: boolean;
  actionText?: string;
}
