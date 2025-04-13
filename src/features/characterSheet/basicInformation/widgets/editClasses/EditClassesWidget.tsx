import { useModal } from "@/hooks/useModal";
import { JSX } from "react";
import EditClassesField from "./EditClassesField";
import EditClassesDrawer from "./EditClassesDrawer";
import { useAppSelector } from "@/redux/hooks";

const EditClassesWidget = (): JSX.Element => {
  const classes = useAppSelector((state) => {
    return state.basicInformation.latest.classes;
  });

  const { isOpen, open, close } = useModal();
  return (
    <>
      <EditClassesField
        textStyle={"lg"}
        fontWeight={"bold"}
        classes={classes}
        onClick={open}
      />
      {isOpen && (
        <EditClassesDrawer open={isOpen} onClose={close} />
      )}
    </>
  );
};

export default EditClassesWidget;
