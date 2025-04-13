import { useAppSelector } from "@/redux/hooks";
import { useCharacterLevel } from "./useCharacterLevel";
import { useMemo } from "react";

export const useProficiencyBonus = () => {
  const profBonuses = useAppSelector(state => state.proficiencyBonusDataSet.latest);
  const characterLevel = useCharacterLevel();

  const profBonus = useMemo(() => {
    let bonus = 0;
    const foundBonusIndex = profBonuses.findIndex(pb => pb.level === characterLevel);
    if (foundBonusIndex >= 0) {
      bonus = profBonuses[foundBonusIndex].bonus;
    }

    return bonus;
  }, [characterLevel, profBonuses]);

  return profBonus;
};
