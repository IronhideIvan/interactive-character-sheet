import { JSX } from "react";
import DataTextField from "./fields/DataTextField";
import DataBooleanField from "./fields/DataBooleanField";
import DataNumberField from "./fields/DataNumberField";
import { DataFieldProps } from "./dataFieldProps";
import { DataObjectValueType } from "@/types/data/dataObject";
import { Box, Text } from "@chakra-ui/react";
import DataCalculationEditor from "@/features/general/dataCalculations/DataCalculationEditor";

const DataField = (props: DataFieldProps): JSX.Element => {
  let retComponent: React.ReactNode;

  switch (props.data.type) {
    case "text":
      retComponent = <DataTextField {...props} />;
      break;

    case "boolean":
      retComponent = <DataBooleanField {...props} />;
      break;

    case "number":
      retComponent = <DataNumberField {...props} />;
      break;

    case DataObjectValueType.Calculation:
      retComponent = (
        <Box>
          <Text>CALCULATED FIELD</Text>
          <DataCalculationEditor {...props} />
        </Box>
      );
      break;

    default:
      throw new Error(`Unknown custom note type '${props.data.type}'`);
  }

  return retComponent;
};

export default DataField;
