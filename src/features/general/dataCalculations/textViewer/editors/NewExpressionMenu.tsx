import { CalculationExpression, CalculationExpressionType, CalculationValueType, CalculationVariableDeclarationExpression } from "@/types/common/dataCalculation";
import { Menu, Button, Portal } from "@chakra-ui/react";
import { JSX } from "react";
import { v4 } from "uuid";
import { buildDefaultCalculationValueOfType } from "../../dataCalculationUtil";

type NewExpressionMenuProps = {
  label: string;
  onAddNewExpression: (newExpression: CalculationExpression) => void;
};

const NewExpressionMenu = ({ label, onAddNewExpression }: NewExpressionMenuProps): JSX.Element => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              value={CalculationExpressionType.VariableDeclaration}
              onClick={() => {
                const newExpr: CalculationVariableDeclarationExpression = {
                  id: v4(),
                  type: CalculationExpressionType.VariableDeclaration,
                  variable: {
                    name: "",
                    type: CalculationValueType.Number,
                  },
                  value: buildDefaultCalculationValueOfType(CalculationValueType.Number),
                };
                onAddNewExpression(newExpr);
              }}
            >
              Variable Declaration
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default NewExpressionMenu;
