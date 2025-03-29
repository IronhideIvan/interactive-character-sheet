import { JSX } from "react";
import { ColumnInfo } from "./dataGridTypes";
import { Table } from "@chakra-ui/react";

type DataGridProps<T> = {
  items: T[];
  columnInfo: ColumnInfo<T>[];
  getId: (item: T) => string;
  getValue: (item: T, columnKey: keyof T) => string;
};

// The comma dangle is necessary here to allow typescript to differentiate
// the generic from a JSX element
// eslint-disable-next-line @stylistic/comma-dangle
const DataGrid = <T,>(props: DataGridProps<T>): JSX.Element => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {props.columnInfo.map((ci) => {
            return (
              <Table.ColumnHeader key={ci.key.toString()}>{ci.name}</Table.ColumnHeader>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.items.map((item) => {
          return (
            <Table.Row key={props.getId(item)}>
              {props.columnInfo.map((ci) => {
                return (
                  <Table.Cell key={`${ci.key.toString()}-${props.getId(item)}`}>{props.getValue(item, ci.key)}</Table.Cell>
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
