export enum ActionButtonType {
  SaveCancel = "SaveCancel",
  Close = "Close"
}

export type ActionButtonProps = {
  onSave?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
};
