import FloatingLabel from "@/components/FloatingLabel";
import { CharacterClass } from "@/types/character/characterClass";
import { Button, Text, TextProps } from "@chakra-ui/react";
import { JSX, useMemo } from "react";

type EditClassesFieldProps = {
  classes: CharacterClass[];
  onClick: () => void;
} & TextProps;

const EditClassesField = ({ classes, onClick, ...textProps }: EditClassesFieldProps): JSX.Element => {
  const displayValue: string = useMemo(() => {
    let classText = "";
    for (const c of classes) {
      if (c.name.length === 0 || c.level === 0) {
        continue;
      }

      if (classText.length > 0) {
        classText = classText.concat(", ");
      }

      classText = classText.concat(`${c.name} ${c.level}`);
    }

    return classText;
  }, [classes]);

  return (
    <FloatingLabel label="Class & Level" floating={displayValue.length > 0}>
      <Button
        width={"100%"}
        height={"100%"}
        variant={"outline"}
        onClick={onClick}
      >
        <Text {...textProps}>
          {displayValue}
        </Text>
      </Button>
    </FloatingLabel>
  );
};

export default EditClassesField;
