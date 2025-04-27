import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Skill } from "@/types/data/skill";
import { JSX, useMemo } from "react";
import { deleteSkill, resetState, setSkills, upsertSkill } from "./skillsDataSetSlice";
import { Icon } from "@/types/data/icon";
import { v4 as uuidv4 } from "uuid";
import { createListCollection } from "@chakra-ui/react";
import { DataDropdownItem } from "@/components/dataGrid/editors/DataDropdownEditor";
import { SkillScore } from "@/types/character/skillScore";
import { setSkillScores } from "@/features/characterSheet/skills/skillsSlice";
import { ProficiencyLevel } from "@/types/character/score";

const SkillsDataSet = (): JSX.Element => {
  const skills = useAppSelector(state => state.skillsDataSet.latest);
  const skillScores = useAppSelector(state => state.skillScores.latest);
  const abilities = useAppSelector(state => state.abilitiesDataSet.latest);
  const dispatch = useAppDispatch();

  const resetSkillScores = (changedSkills: Skill[]) => {
    const newScores: SkillScore[] = new Array(changedSkills.length);
    for (let i = 0; i < newScores.length; i++) {
      const newSkill = changedSkills[i];

      const existingScoreIndex = skillScores.findIndex(ss => ss.skillId === newSkill.id);
      if (existingScoreIndex >= 0) {
        newScores[i] = skillScores[i];
      }
      else {
        newScores[i] = {
          skillId: newSkill.id,
          score: {
            baseValue: 0,
            proficiencyLevel: ProficiencyLevel.None,
          },
        };
      }
    }

    dispatch(setSkillScores(newScores));
  };

  const abilityList = useMemo(() => {
    return createListCollection<DataDropdownItem>({
      items:
      [
        {
          id: "",
          label: "",
        },
        ...abilities.map((a): DataDropdownItem => {
          return {
            id: a.id,
            label: a.name,
            icon: a.icon,
          };
        }),
      ],
      itemToValue: item => item.id,
    });
  }, [abilities]);

  const handleGetId = (item: Skill) => {
    return item.id;
  };

  const handleStringValueChanged = (item: Skill, columnKey: keyof Skill, value: string) => {
    let newItem: Skill | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      default:
        break;
    }

    if (newItem) {
      dispatch(upsertSkill(newItem));
    }
  };

  const handleIconValueChanged = (item: Skill, key: keyof Skill, value: Icon) => {
    if (key === "icon") {
      dispatch(upsertSkill({ ...item, icon: value }));
    }
  };

  const provideReferenceOptions = (key: keyof Skill) => {
    if (key === "abilityId") {
      return abilityList;
    }
  };

  const handleReferenceValueChanged = (item: Skill, key: keyof Skill, value: string[]) => {
    if (value.length === 0) {
      return;
    }

    if (key === "abilityId") {
      const id = value[0];
      dispatch(upsertSkill({ ...item, abilityId: id.length === 0 ? undefined : value[0] }));
    }
  };

  const handleAddRow = () => {
    const newSkills: Skill[] = [
      ...skills,
      {
        id: uuidv4(),
        name: "",
      },
    ];
    dispatch(setSkills(newSkills));
    resetSkillScores(newSkills);
  };

  const handleDeleteRow = (item: Skill) => {
    dispatch(deleteSkill(item.id));
  };

  const handleRevertAllChanges = () => {
    dispatch(resetState());
  };

  const handleGetFriendlyName = (item: Skill) => {
    return item.name.length === 0 ? "Unknown" : item.name;
  };

  return (
    <DataGrid
      items={skills}
      columnInfo={[
        {
          name: "Name",
          key: "name",
          type: "text",
        },
        {
          name: "Icon",
          key: "icon",
          type: "icon",
        },
        {
          name: "Ability Modifier",
          key: "abilityId",
          type: "reference",
          minWidth: "10rem",
        },
      ]}
      getId={handleGetId}
      getFriendlyName={handleGetFriendlyName}
      getReferenceOptions={provideReferenceOptions}
      onStringValueChange={handleStringValueChanged}
      onIconValueChange={handleIconValueChanged}
      onReferenceValueChange={handleReferenceValueChanged}
      onAddRow={handleAddRow}
      onDeleteRow={handleDeleteRow}
      onRevertAllChanges={handleRevertAllChanges}
    />
  );
};

export default SkillsDataSet;
