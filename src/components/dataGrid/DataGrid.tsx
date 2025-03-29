import { JSX, useCallback, useState } from "react";
import { ColumnInfo } from "./dataGridTypes";
import { Box, IconButton, Table, VStack } from "@chakra-ui/react";
import DataTextEditor from "./editors/DataTextEditor";
import { Icon } from "@/types/data/icon";
import DataColorEditor from "./editors/DataColorEditor";
import IconPickerDialog from "../iconPicker/IconPickerDialog";
import DynamicIcon from "../icons/DynamicIcon";
import { FaPlus, FaTrash } from "react-icons/fa";
import ConfirmIconButton from "../buttons/ConfirmIconButton";

type DataGridProps<T> = {
  items: T[];
  columnInfo: ColumnInfo<T>[];
  getId: (item: T) => string;
  onStringValueChange?: (item: T, columnKey: keyof T, value: string) => void;
  onIconValueChange?: (item: T, columnKey: keyof T, value: Icon) => void;
  onAddRow?: () => void;
  onDeleteRow?: (item: T) => void;
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
    onAddRow,
    onDeleteRow,
  }: DataGridProps<T>): JSX.Element => {
  const [isIconDialogOpen, setIsIconDialogOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<Icon | undefined>();
  const [selectedItem, setSelectedItem] = useState<T | undefined>();
  const [selectedColumn, setSelectedColumn] = useState<ColumnInfo<T> | undefined>();

  const getDefaultValue = useCallback((item: T, columnInfo: ColumnInfo<T>) => {
    return JSON.stringify(item[columnInfo.key]);
  }, []);

  // eslint-disable-next-line @stylistic/comma-dangle
  const getValue = useCallback(<K,>(item: T, columnKey: keyof T): K | undefined => {
    return item[columnKey] as K;
  }, []);

  const handleIconDialogOpen = useCallback((itemId: string, columnInfo: ColumnInfo<T>) => {
    const item = items.find(it => getId(it) === itemId);
    if (!item) {
      return;
    }

    const icon = getValue<Icon>(item, columnInfo.key);
    setSelectedIcon(icon);
    setSelectedItem (item);
    setSelectedColumn(columnInfo);
    setIsIconDialogOpen(true);
  }, [getId, getValue, items]);

  const handleIconDialogClose = () => {
    setIsIconDialogOpen(false);
  };

  const handleIconDialogChoice = (icon: Icon) => {
    setIsIconDialogOpen(false);
    if (onIconValueChange && selectedItem && selectedColumn) {
      onIconValueChange(selectedItem, selectedColumn.key, icon);
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
              handleIconDialogOpen(getId(item), ci);
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
      <VStack rowGap={0}>
        <Table.Root variant={"outline"} showColumnBorder>
          <Table.Header>
            <Table.Row>
              {onDeleteRow && <Table.ColumnHeader key={"table.actions"} w={6} />}

              {columnInfo.map((ci) => {
                return (
                  <Table.ColumnHeader
                    minW={"3rem"}
                    padding={0}
                    textAlign={"center"}
                    key={ci.key.toString()}
                  >{ci.name}
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => {
              return (
                <Table.Row key={getId(item)}>
                  {onDeleteRow && (
                    <Table.Cell key={"table.actions"} padding={1}>
                      <ConfirmIconButton
                        size={"sm"}
                        variant={"ghost"}
                        rounded={"full"}
                        color="red"
                        onConfirmClick={() => {
                          onDeleteRow(item);
                        }}
                        confirm={{
                          variant: "outline",
                        }}
                      >
                        <FaTrash />
                      </ConfirmIconButton>
                    </Table.Cell>
                  )}
                  {columnInfo.map((ci) => {
                    return (
                      <Table.Cell
                        padding={1}
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
        {onAddRow && (
          <Box width={"100%"}>
            <IconButton width={"100%"} variant={"outline"} onClick={onAddRow}>
              <FaPlus />
            </IconButton>
          </Box>
        )}

      </VStack>
      {selectedItem && selectedColumn && (
        <IconPickerDialog
          open={isIconDialogOpen}
          defaultIcon={selectedIcon}
          title={selectedColumn.name}
          onClose={handleIconDialogClose}
          onSelect={handleIconDialogChoice}
        />
      )}
    </>
  );
};

export default DataGrid;
