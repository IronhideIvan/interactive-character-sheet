import { JSX } from "react";
import { IconBaseProps, IconType } from "react-icons";
import * as allGameIcons from "react-icons/gi";
import * as allFontAwesomeIcons from "react-icons/fa";
import { MdQuestionMark } from "react-icons/md";

type DynamicIconProps = {
  iconId: string;
} & IconBaseProps;

const DynamicIcon = ({ iconId, ...baseProps }: DynamicIconProps): JSX.Element => {
  let Icon: IconType | undefined;
  if (iconId.startsWith("Gi")) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon = (allGameIcons as any)[iconId] as IconType;
  }
  else if (iconId.startsWith("Fa")) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon = (allFontAwesomeIcons as any)[iconId] as IconType;
  }

  if (Icon === undefined) {
    Icon = MdQuestionMark;
  }

  return <Icon {...baseProps} style={{ width: "100%", height: "100%" }} />;
};

export default DynamicIcon;
