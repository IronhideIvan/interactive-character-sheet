import { JSX } from "react";
import { CustomNoteTextFieldProps } from "./customNoteFieldProps";
import CustomNoteTextField from "./fields/CustomNoteTextField";
import CustomNoteBooleanField from "./fields/CustomNoteBooleanField";
import CustomNoteNumberField from "./fields/CustomNoteNumberField";

const CustomNoteField = (props: CustomNoteTextFieldProps): JSX.Element => {
  let retComponent: React.ReactNode;

  switch (props.note.type) {
    case "text":
      retComponent = <CustomNoteTextField {...props} />;
      break;

    case "boolean":
      retComponent = <CustomNoteBooleanField {...props} />;
      break;

    case "number":
      retComponent = <CustomNoteNumberField {...props} />;
      break;

    default:
      throw new Error(`Unknown custom note type '${props.note.type}'`);
  }

  return retComponent;
};

export default CustomNoteField;
