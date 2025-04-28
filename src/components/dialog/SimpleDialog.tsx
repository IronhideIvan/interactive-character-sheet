import { CloseButton, Dialog } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";
import { ActionButtonProps, ActionButtonType } from "./actionButtonTypes";
import { ActionButtons } from "./ActionButtons";

type SimpleDialogProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
  actionButtonsType?: ActionButtonType;
} & ActionButtonProps;

const SimpleDialog = ({
  open, title, onClose, children, actionButtonsType, ...actionButtonProps
}: SimpleDialogProps): JSX.Element => {
  return (
    <Dialog.Root
      placement={"center"}
      open={open}
      size={"lg"}
      scrollBehavior={"outside"}
      unmountOnExit={true}
      modal={false}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxHeight={"98vh"}>
          {title
            && (
              <Dialog.Header paddingBottom={2}>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
          <Dialog.Body overflow={"auto"}>
            {children}
          </Dialog.Body>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" onClick={onClose} />
          </Dialog.CloseTrigger>
          <Dialog.Footer>
            {actionButtonsType && (
              <ActionButtons {...actionButtonProps} buttonType={actionButtonsType} />
            )}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default SimpleDialog;
