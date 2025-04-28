import { Button, HStack } from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import { ActionButtonProps, ActionButtonType } from "./actionButtonTypes";

export const ActionButtons = ({ buttonType, ...props }: {
  buttonType: ActionButtonType;
} & ActionButtonProps): JSX.Element => {
  switch (buttonType) {
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
