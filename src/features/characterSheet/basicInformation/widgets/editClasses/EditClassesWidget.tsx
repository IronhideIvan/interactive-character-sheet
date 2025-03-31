import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CharacterClass } from "@/types/character/characterClass";
import { JSX } from "react";
import { setClasses } from "../../basicInformationSlice";
import FloatingDrawer from "@/components/FloatingDrawer";
import EditClassesDataGrid from "./EditClassesDataGrid";
import { Flex } from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";

type EditClassesWidgetProps = {
  open: boolean;
  onClose: () => void;
};

const EditClassesWidget = (props: EditClassesWidgetProps): JSX.Element => {
  const { classes } = useAppSelector(state => state.basicInformation.latest);
  const { classes: initialClasses } = useAppSelector(state => state.basicInformation.initial);
  const dispatch = useAppDispatch();

  const handleClassesChanged = (newClasses: CharacterClass[]) => {
    dispatch(setClasses(newClasses));
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      props.onClose();
    }
  };

  const handleRevertChanges = () => {
    dispatch(setClasses(cloneDeep(initialClasses)));
  };

  return (
    <FloatingDrawer
      title="Manage Classes"
      size={"md"}
      open={props.open}
      onOpenChange={det => handleOpenChange(det.open)}
    >
      <Flex width={"100%"} justifyContent={"center"}>
        <EditClassesDataGrid
          classes={classes}
          onClassesChanged={handleClassesChanged}
          onRevertChanges={handleRevertChanges}
        />
      </Flex>
    </FloatingDrawer>
  );
};

export default EditClassesWidget;
