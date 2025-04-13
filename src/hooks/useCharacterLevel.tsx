import { useAppSelector } from "@/redux/hooks";
import { useMemo } from "react";

export const useCharacterLevel = () => {
  const classes = useAppSelector(state => state.basicInformation.latest.classes);

  const classSum = useMemo(() => {
    let sum = 0;
    classes.forEach((c) => {
      sum += c.level;
    });
    return sum;
  }, [classes]);

  return classSum;
};
