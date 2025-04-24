import FloatingDrawer from "@/components/FloatingDrawer";
import ScoreEditor from "@/components/ScoreEditor";
import { AbilityScore } from "@/types/character/abilityScore";
import { Score } from "@/types/character/score";
import { Ability } from "@/types/data/ability";
import cloneDeep from "lodash.clonedeep";
import { JSX } from "react";

type AbilityScoreDrawerProps = {
  open: boolean;
  ability: Ability;
  abilityScore: AbilityScore;
  onClose: () => void;
  onChange: (newAbilityScore: AbilityScore) => void;
};

const AbilityScoreDrawer = ({
  ability,
  abilityScore,
  open,
  onClose,
  onChange,
}: AbilityScoreDrawerProps): JSX.Element => {
  const handleScoreChange = (newScore: Score) => {
    const newAs = cloneDeep(abilityScore);
    newAs.score = newScore;
    onChange(newAs);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <FloatingDrawer
      title={ability.name}
      size={"md"}
      open={open}
      onOpenChange={det => handleOpenChange(det.open)}
    >
      <ScoreEditor score={abilityScore.score} onChange={handleScoreChange} />
    </FloatingDrawer>
  );
};

export default AbilityScoreDrawer;
