import { ProficiencyLevel, Score } from "@/types/character/score";
import { Field, HStack, RadioGroup, VStack } from "@chakra-ui/react";
import { JSX } from "react";
import NumberEditor from "./NumberEditor";
import WidgetPaper from "./WidgetPaper";

type ScoreEditorProps = {
  score: Score;
  onChange: (score: Score) => void;
  hideBaseValueEditor?: boolean;
};

const ScoreEditor = ({ score, onChange, hideBaseValueEditor }: ScoreEditorProps): JSX.Element => {
  const handleValueChange = (newValue: number) => {
    onChange({
      baseValue: newValue,
      proficiencyLevel: score.proficiencyLevel,
    });
  };

  const handleProficiencyChange = (newProfLevel: ProficiencyLevel) => {
    onChange({
      baseValue: score.baseValue,
      proficiencyLevel: newProfLevel,
    });
  };

  return (
    <VStack gap={3}>
      {!hideBaseValueEditor && (
        <NumberEditor label="Score" value={score.baseValue} onValueChange={handleValueChange} />
      )}
      <Field.Root>
        <Field.Label>Proficiency Level</Field.Label>
        <WidgetPaper paddingX={3}>
          <RadioGroup.Root
            value={score.proficiencyLevel}
            onValueChange={e => handleProficiencyChange(e.value as ProficiencyLevel)}
          >
            <HStack gap="6" alignItems={"start"}>
              {proficiencyLevelItems.map(item => (
                <RadioGroup.Item key={item.value} value={item.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        </WidgetPaper>
      </Field.Root>
    </VStack>
  );
};

const proficiencyLevelItems: {
  label: string; value: ProficiencyLevel;
}[] = [
  { label: "None", value: ProficiencyLevel.None },
  { label: "Proficiency", value: ProficiencyLevel.Proficiency },
  { label: "Expertise", value: ProficiencyLevel.Expertise },
];

export default ScoreEditor;
