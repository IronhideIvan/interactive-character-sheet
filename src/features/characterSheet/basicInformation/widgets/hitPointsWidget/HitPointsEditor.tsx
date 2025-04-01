import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { HitPoints } from "@/types/character/hitPoints";
import { Field, NumberInput, VStack } from "@chakra-ui/react";
import { JSX } from "react";
import { setHP } from "../../basicInformationSlice";

const HitPointsEditor = (): JSX.Element => {
  const characterHitPoints = useAppSelector(state => state.basicInformation.latest.hitPoints);
  const dispatch = useAppDispatch();

  const updateHitPoints = (hp: HitPoints) => {
    dispatch(setHP(hp));
  };

  const handleMaxChange = (value: number) => {
    updateHitPoints({
      ...characterHitPoints,
      max: value,
    });
  };

  const handleCurrentChange = (value: number) => {
    updateHitPoints({
      ...characterHitPoints,
      current: value,
    });
  };

  const handleTempChange = (value: number) => {
    updateHitPoints({
      ...characterHitPoints,
      temp: value,
    });
  };

  return (
    <VStack>
      <Field.Root>
        <Field.Label>Max</Field.Label>
        <NumberInput.Root
          width={"100%"}
          allowMouseWheel
          value={characterHitPoints.max.toString()}
          onValueChange={e => handleMaxChange(e.valueAsNumber)}
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Current</Field.Label>
        <NumberInput.Root
          width={"100%"}
          allowMouseWheel
          value={characterHitPoints.current.toString()}
          onValueChange={e => handleCurrentChange(e.valueAsNumber)}
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Temp</Field.Label>
        <NumberInput.Root
          width={"100%"}
          allowMouseWheel
          value={characterHitPoints.temp.toString()}
          onValueChange={e => handleTempChange(e.valueAsNumber)}
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      </Field.Root>
    </VStack>
  );
};

export default HitPointsEditor;
