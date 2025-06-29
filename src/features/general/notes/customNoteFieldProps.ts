import { CustomNote } from "@/types/common/customNote";

export type CustomNoteFieldProps = {
  note: CustomNote;
  onChange: (newNote: CustomNote) => void;
};
