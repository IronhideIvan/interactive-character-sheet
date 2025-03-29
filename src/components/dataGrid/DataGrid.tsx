import { JSX, useCallback, useState } from "react";
import { ColumnInfo } from "./dataGridTypes";
import { Table } from "@chakra-ui/react";
import DataTextEditor from "./editors/DataTextEditor";
import { Icon } from "@/types/data/icon";
import DataColorEditor from "./editors/DataColorEditor";
import IconPickerDialog from "../iconPicker/IconPickerDialog";
import DynamicIcon from "../icons/DynamicIcon";

type DataGridProps<T> = {
  items: T[];
  columnInfo: ColumnInfo<T>[];
  getId: (item: T) => string;
  onStringValueChange?: (item: T, columnKey: keyof T, value: string) => void;
  onIconValueChange?: (item: T, columnKey: keyof T, value: Icon) => void;
};

// The comma dangle is necessary here to allow typescript to differentiate
// the generic from a JSX element
// eslint-disable-next-line @stylistic/comma-dangle
const DataGrid = <T,>(
  {
    items,
    columnInfo,
    getId,
    onStringValueChange,
    onIconValueChange,
  }: DataGridProps<T>): JSX.Element => {
  const [isIconDialogOpen, setIsIconDialogOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<Icon | undefined>();
  const [selectedItem, setSelectedItem] = useState<T | undefined>();
  const [selectedColumn, setSelectedColumn] = useState<keyof T | undefined>();

  const getDefaultValue = useCallback((item: T, columnInfo: ColumnInfo<T>) => {
    return JSON.stringify(item[columnInfo.key]);
  }, []);

  // eslint-disable-next-line @stylistic/comma-dangle
  const getValue = useCallback(<K,>(item: T, columnKey: keyof T): K | undefined => {
    return item[columnKey] as K;
  }, []);

  const handleIconDialogOpen = useCallback((itemId: string, columnKey: keyof T) => {
    const item = items.find(it => getId(it) === itemId);
    if (!item) {
      return;
    }

    const icon = getValue<Icon>(item, columnKey);
    setSelectedIcon(icon);
    setSelectedItem (item);
    setSelectedColumn(columnKey);
    setIsIconDialogOpen(true);
  }, [getId, getValue, items]);

  const handleIconDialogClose = () => {
    setIsIconDialogOpen(false);
  };

  const handleIconDialogChoice = (icon: Icon) => {
    setIsIconDialogOpen(false);
    if (onIconValueChange && selectedItem && selectedColumn) {
      onIconValueChange(selectedItem, selectedColumn, icon);
    }
  };

  const getEditorForCell = useCallback((item: T, ci: ColumnInfo<T>) => {
    switch (ci.type) {
      case "text":
        if (ci.readonly) {
          return getValue<string>(item, ci.key);
        }

        return (
          <DataTextEditor
            value={getValue<string>(item, ci.key) ?? ""}
            onValueChanged={(v) => {
              if (onStringValueChange) {
                onStringValueChange(item, ci.key, v);
              }
            }}
            placeholder={ci.name}
          />
        );

      case "icon":
      {
        const icon = getValue<Icon>(item, ci.key);
        if (ci.readonly) {
          if (!icon) {
            return "";
          }

          return <DynamicIcon iconId={icon.id} color={icon.color} />;
        }

        return (
          <DataColorEditor
            icon={icon}
            onClick={() => {
              handleIconDialogOpen(getId(item), ci.key);
            }}
          />
        );
      }

      default:
        return getDefaultValue(item, ci);
    }
  }, [
    getDefaultValue,
    getId,
    getValue,
    handleIconDialogOpen,
    onStringValueChange,
  ]);

  return (
    <>
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
      {selectedItem && selectedColumn && (
        <IconPickerDialog
          open={isIconDialogOpen}
          defaultIcon={selectedIcon}
          onClose={handleIconDialogClose}
          onSelect={handleIconDialogChoice}
        />
      )}
    </>
  );
};

export default DataGrid;
