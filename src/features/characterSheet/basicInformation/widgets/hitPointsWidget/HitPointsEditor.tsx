import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { HitPoints } from "@/types/character/hitPoints";
import { VStack } from "@chakra-ui/react";
import { JSX } from "react";
import { setHP } from "../../basicInformationSlice";
import NumberEditor from "@/components/NumberEditor";

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
      <NumberEditor label="Max" value={characterHitPoints.max} onValueChange={handleMaxChange} />
      <NumberEditor label="Current" value={characterHitPoints.current} onValueChange={handleCurrentChange} />
      <NumberEditor label="Temp" value={characterHitPoints.temp} onValueChange={handleTempChange} />
    </VStack>
  );
};

export default HitPointsEditor;
