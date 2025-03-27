import { JSX } from "react";

type BasicInformationCardProps = {
  a?: string;
};

const BasicInformationCard = (props: BasicInformationCardProps): JSX.Element => {
  return <div>{JSON.stringify(props)}</div>;
};

export default BasicInformationCard;
