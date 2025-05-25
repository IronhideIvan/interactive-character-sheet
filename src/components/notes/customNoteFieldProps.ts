import { CustomNote } from "@/types/common/customNote";

export type CustomNoteTextFieldProps = {
  note: CustomNote;
  onChange: (newNote: CustomNote) => void;
};
