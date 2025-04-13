import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Ability } from "@/types/data/ability";
import { JSX } from "react";
import { deleteAbility, resetState as resetAbilityState, setAbilities, upsertAbility } from "./abilitiesDataSetSlice";
import { Icon } from "@/types/data/icon";
import { v4 as uuidv4 } from "uuid";
import { AbilityScore } from "@/types/character/abilityScore";
import { deleteAbilityScore, resetState as resetAbilityScoreState, setAbilityScores } from "@/features/characterSheet/abilityScores/abilityScoresSlice";

const AbilitiesDataSet = (): JSX.Element => {
  const abilities = useAppSelector(state => state.abilitiesDataSet.latest);
  const abilityScores = useAppSelector(state => state.abilityScores.latest);
  const dispatch = useAppDispatch();

  const resetAbilityScores = (changedAbilities: Ability[]) => {
    const newScores: AbilityScore[] = new Array(changedAbilities.length);
    for (let i = 0; i < newScores.length; i++) {
      const newAbility = changedAbilities[i];

      const existingScoreIndex = abilityScores.findIndex(as => as.abilityId === newAbility.id);
      if (existingScoreIndex >= 0) {
        newScores[i] = abilityScores[i];
      }
      else {
        newScores[i] = {
          abilityId: newAbility.id,
          baseScore: 10,
          modifier: 0,
          proficiency: false,
          baseSavingThrow: 0,
        };
      }
    }

    dispatch(setAbilityScores(newScores));
  };

  const handleGetId = (item: Ability) => {
    return item.id;
  };

  const handleStringValueChanged = (item: Ability, columnKey: keyof Ability, value: string) => {
    let newItem: Ability | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      case "abbreviation":
        newItem = { ...item, abbreviation: value };
        break;
      default:
        break;
    }

    if (newItem) {
      dispatch(upsertAbility(newItem));
    }
  };

  const handleIconValueChanged = (item: Ability, key: keyof Ability, value: Icon) => {
    if (key === "icon") {
      dispatch(upsertAbility({ ...item, icon: value }));
    }
  };

  const handleAddRow = () => {
    const newAbilities: Ability[] = [
      ...abilities,
      {
        id: uuidv4(),
        name: "",
        abbreviation: "",
      },
    ];

    dispatch(setAbilities(newAbilities));
    resetAbilityScores(newAbilities);
  };

  const handleDeleteRow = (item: Ability) => {
    dispatch(deleteAbility(item.id));
    dispatch(deleteAbilityScore(item.id));
  };

  const handleRevertAllChanges = () => {
    dispatch(resetAbilityState());
    dispatch(resetAbilityScoreState());
  };

  const handleGetFriendlyName = (item: Ability) => {
    return item.name.length === 0 ? "Unknown" : item.name;
  };

  return (
    <DataGrid
      items={abilities}
      columnInfo={[
        {
          name: "Name",
          key: "name",
          type: "text",
        },
        {
          name: "Abbreviation",
          key: "abbreviation",
          type: "text",
        },
        {
          name: "Icon",
          key: "icon",
          type: "icon",
        },
      ]}
      getId={handleGetId}
      getFriendlyName={handleGetFriendlyName}
      onStringValueChange={handleStringValueChanged}
      onIconValueChange={handleIconValueChanged}
      onAddRow={handleAddRow}
      onDeleteRow={handleDeleteRow}
      onRevertAllChanges={handleRevertAllChanges}
    />
  );
};

export default AbilitiesDataSet;
