import DataGrid from "@/components/dataGrid/DataGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Skill } from "@/types/data/skill";
import { JSX } from "react";
import { deleteSkill, resetState, setSkills, upsertSkill } from "./skillsDataSetSlice";
import { Icon } from "@/types/data/icon";
import { v4 as uuidv4 } from "uuid";

const SkillsDataSet = (): JSX.Element => {
  const skills = useAppSelector(state => state.skillsDataSet.latest);
  const dispatch = useAppDispatch();

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

  const handleAddRow = () => {
    dispatch(setSkills([
      ...skills,
      {
        id: uuidv4(),
        name: "",
      },
    ]));
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

export default SkillsDataSet;
