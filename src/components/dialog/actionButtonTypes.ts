export enum ActionButtonType {
  SaveCancel = "SaveCancel"
}

export type ActionButtonProps = {
  onSave?: () => void;
  onCancel?: () => void;
};
