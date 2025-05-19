import { useAppSelector } from "@/redux/hooks";
import { Feature } from "@/types/data/feature";
import { useCallback } from "react";

export const useFeatureFinder = () => {
  const features = useAppSelector(state => state.featuresDataSet.latest);

  const findFeature = useCallback((featureId: string): Feature | undefined => {
    return features.find(f => f.id === featureId);
  }, [features]);

  return { findFeature };
};
