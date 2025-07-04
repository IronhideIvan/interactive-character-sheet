import { Button, HStack } from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import { ActionButtonProps, ActionButtonType } from "./actionButtonTypes";

export const ActionButtons = ({ buttonType, ...props }: {
  buttonType: ActionButtonType;
} & ActionButtonProps): JSX.Element => {
  switch (buttonType) {
    case ActionButtonType.Close:
      return <CloseActionButtons {...props} />;
    default:
      return <SaveCancelActionButtons {...props} />;
  }
};

const SaveCancelActionButtons = (props: ActionButtonProps): JSX.Element => {
  return (
    <HStack>
      <Button
        colorPalette={"blue"}
        variant={"outline"}
        onClick={props.onSave}
      >Save
      </Button>
      <Button
        variant={"outline"}
        onClick={props.onCancel}
      >Cancel
      </Button>
    </HStack>
  );
};

const CloseActionButtons = (props: ActionButtonProps): JSX.Element => {
  return (
    <HStack>
      <Button
        variant={"outline"}
        onClick={props.onClose}
      >Close
      </Button>
    </HStack>
  );
};
