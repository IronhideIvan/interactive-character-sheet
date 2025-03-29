import { BasicInformation } from "./character/basicInformation";
import { Ability } from "./data/ability";

export type SaveFile = {
  character: {
    basicInformation: BasicInformation;
  };
  data: {
    abilities: Ability[];
  };
};
