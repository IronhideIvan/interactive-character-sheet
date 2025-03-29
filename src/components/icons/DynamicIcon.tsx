import { JSX } from "react";
import { IconType } from "react-icons";
import * as allGameIcons from "react-icons/gi";
import * as allMaterialIcons from "react-icons/md";

type DynamicIconProps = {
  iconId: string;
};

const DynamicIcon = ({ iconId }: DynamicIconProps): JSX.Element => {
  let Icon: IconType | undefined;
  if (iconId.startsWith("Gi")) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon = (allGameIcons as any)[iconId] as IconType;
  }
  else if (iconId.startsWith("Md")) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon = (allMaterialIcons as any)[iconId] as IconType;
  }

  if (Icon === undefined) {
    Icon = allMaterialIcons.MdQuestionMark;
  }

  return <Icon />;
};

export default DynamicIcon;
