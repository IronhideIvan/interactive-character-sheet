import { JSX, useCallback } from "react";
import { ColumnInfo } from "./dataGridTypes";
import { Table } from "@chakra-ui/react";
import DataTextEditor from "./editors/DataTextEditor";

type DataGridProps<T> = {
  items: T[];
  columnInfo: ColumnInfo<T>[];
  getId: (item: T) => string;
  getDisplayValue: (item: T, columnKey: keyof T) => string;
  onStringValueChange?: (item: T, columnKey: keyof T, value: string) => void;
};

// The comma dangle is necessary here to allow typescript to differentiate
// the generic from a JSX element
// eslint-disable-next-line @stylistic/comma-dangle
const DataGrid = <T,>({ items, columnInfo, getId, getDisplayValue, onStringValueChange }: DataGridProps<T>): JSX.Element => {
  const getEditorForCell = useCallback((item: T, columnInfo: ColumnInfo<T>) => {
    switch (columnInfo.type) {
      case "text":
        return (
          <DataTextEditor
            value={getDisplayValue(item, columnInfo.key)}
            onValueChanged={(v) => {
              if (onStringValueChange) {
                onStringValueChange(item, columnInfo.key, v);
              }
            }}
            placeholder={columnInfo.name}
          />
        );

      default:
        return getDisplayValue(item, columnInfo.key);
    }
  }, [getDisplayValue, onStringValueChange]);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columnInfo.map((ci) => {
            return (
              <Table.ColumnHeader padding={0} textAlign={"center"} key={ci.key.toString()}>{ci.name}</Table.ColumnHeader>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => {
          return (
            <Table.Row key={getId(item)}>
              {columnInfo.map((ci) => {
                return (
                  <Table.Cell
                    padding={0}
                    paddingLeft={1}
                    paddingRight={1}
                    key={`${ci.key.toString()}-${getId(item)}`}
                  >
                    {getEditorForCell(item, ci)}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default DataGrid;
