import FloatingLabelTextField from "@/components/FloatingLabelTextField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { JSX } from "react";
import { setArmorClass } from "../../basicInformationSlice";

const ArmorClassWidget = (): JSX.Element => {
  const armorClass = useAppSelector(state => state.basicInformation.latest.armorClass);
  const dispatch = useAppDispatch();

  const handleAcChange = (value: string) => {
    const valueAsInt = value === "" ? 0 : parseInt(value);
    if (Number.isInteger(valueAsInt)) {
      dispatch(setArmorClass({ totalAc: valueAsInt }));
    }
  };

  return (
    <FloatingLabelTextField
      textAlign={"center"}
      paddingY={6}
      textStyle={"lg"}
      fontWeight={"bold"}
      value={armorClass.totalAc?.toString() ?? "0"}
      onValueChange={handleAcChange}
      label="Armor Class"
    />
  );
};

export default ArmorClassWidget;
