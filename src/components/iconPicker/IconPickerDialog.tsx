import { CloseButton, Dialog } from "@chakra-ui/react";
import { JSX } from "react";
import { IconPicker, IconPickerProps } from "./IconPicker";

type IconPickerDialogProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
} & IconPickerProps;

const IconPickerDialog = ({ open, onClose, title, ...props }: IconPickerDialogProps): JSX.Element => {
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
        <Dialog.Content>
          {title
            && (
              <Dialog.Header paddingBottom={0}>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
          <Dialog.Body>
            <IconPicker {...props} colSpan={{ base: 4, md: 3 }} height={{ md: "80vh" }} />
          </Dialog.Body>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" onClick={onClose} />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default IconPickerDialog;
