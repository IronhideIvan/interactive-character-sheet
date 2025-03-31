import { Editable, Heading } from "@chakra-ui/react";
import { JSX } from "react";

type SectionHeaderEditableProps = {
  placeholder: string;
  value: string;
  onValueChange: (val: string) => void;
};

const SectionHeaderEditable = (props: SectionHeaderEditableProps): JSX.Element => {
  return (
    <Editable.Root
      value={props.value}
      placeholder={props.placeholder}
      onValueChange={(e) => {
        props.onValueChange(e.value);
      }}
    >
      <Editable.Preview width="100%" justifyContent="center">
        {(props.value?.length ?? 0) === 0 && props.placeholder.length > 0
          ? (
            <Heading size="3xl">{props.placeholder}</Heading>
          )
          : (
            <Heading size="3xl">{props.value}</Heading>
          )}
      </Editable.Preview>
      <Editable.Input textAlign="center" fontSize="3xl" />
    </Editable.Root>
  );
};

export default SectionHeaderEditable;
