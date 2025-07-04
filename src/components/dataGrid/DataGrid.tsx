import { JSX, useCallback, useState } from "react";
import { ColumnInfo, EditorType } from "./dataGridTypes";
import { Box, IconButton, ListCollection, Table, VStack } from "@chakra-ui/react";
import DataTextEditor from "./editors/DataTextEditor";
import { Icon } from "@/types/data/icon";
import DataColorEditor from "./editors/DataColorEditor";
import IconPickerDialog from "../iconPicker/IconPickerDialog";
import DynamicIcon from "../DynamicIcon";
import { FaPlus, FaRegEdit, FaTrash, FaUndo } from "react-icons/fa";
import ConfirmIconButton from "../ConfirmIconButton";
import DataNumberEditor from "./editors/DataNumberEditor";
import { DataDropdownEditor, DataDropdownItem } from "./editors/DataDropdownEditor";
import DataMarkdownEditor from "./editors/DataMarkdownEditor";
import DataBooleanEditor from "./editors/DataBooleanEditor";

type DataGridProps<T> = {
  items: T[];
  columnInfo: ColumnInfo<T>[];
  getId: (item: T) => string;
  getFriendlyName?: (item: T) => string;
  getReferenceOptions?: (columnKey: keyof T) => ListCollection<DataDropdownItem> | undefined;
  /** Use this if you need fine-grain control over how the values of properties are fetched */
  getPropertyValue?: <ValueType>(item: T, columnKey: keyof T, type: EditorType) => ValueType;
  onStringValueChange?: (item: T, columnKey: keyof T, value: string) => void;
  onBooleanValueChange?: (item: T, columnKey: keyof T, value: boolean) => void;
  onNumberValueChange?: (item: T, columnKey: keyof T, value: number) => void;
  onIconValueChange?: (item: T, columnKey: keyof T, value: Icon) => void;
  onReferenceValueChange?: (item: T, columnKey: keyof T, value: string[]) => void;
  onAddRow?: () => void;
  onDeleteRow?: (item: T) => void;
  onRevertAllChanges?: () => void;
  onEditClick?: (item: T) => void;
};

// The comma dangle is necessary here to allow typescript to differentiate
// the generic from a JSX element
// eslint-disable-next-line @stylistic/comma-dangle
const DataGrid = <T,>(
  {
    items,
    columnInfo,
    getId,
    getFriendlyName,
    onStringValueChange,
    onBooleanValueChange,
    onNumberValueChange,
    onIconValueChange,
    onAddRow,
    onDeleteRow,
    onRevertAllChanges,
    getReferenceOptions,
    onReferenceValueChange,
    onEditClick,
    getPropertyValue,
  }: DataGridProps<T>): JSX.Element => {
  const [isIconDialogOpen, setIsIconDialogOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<Icon | undefined>();
  const [selectedItem, setSelectedItem] = useState<T | undefined>();
  const [selectedColumn, setSelectedColumn] = useState<ColumnInfo<T> | undefined>();

  const getDefaultValue = useCallback((item: T, columnInfo: ColumnInfo<T>) => {
    return JSON.stringify(item[columnInfo.key]);
  }, []);

  // eslint-disable-next-line @stylistic/comma-dangle
  const getValue = useCallback(<K,>(item: T, columnInfo: ColumnInfo<T>): K | undefined => {
    // If the way to fetch the value of a property is overridden, use that since the parent
    // intends to have fine-grain control over how values are fetched.
    if (getPropertyValue) {
      return getPropertyValue(item, columnInfo.key, columnInfo.type);
    }
    else {
      return item[columnInfo.key] as K;
    }
  }, [getPropertyValue]);

  const handleIconDialogOpen = useCallback((itemId: string, columnInfo: ColumnInfo<T>) => {
    const item = items.find(it => getId(it) === itemId);
    if (!item) {
      return;
    }

    const icon = getValue<Icon>(item, columnInfo);
    setSelectedIcon(icon);
    setSelectedItem (item);
    setSelectedColumn(columnInfo);
    setIsIconDialogOpen(true);
  }, [
    getId,
    getValue,
    items,
  ]);

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
          return getValue<string>(item, ci);
        }

        return (
          <DataTextEditor
            value={getValue<string>(item, ci) ?? ""}
            onValueChanged={(v) => {
              if (onStringValueChange) {
                onStringValueChange(item, ci.key, v);
              }
            }}
            placeholder={ci.name}
          />
        );

      case "markdown":
        return (
          <DataMarkdownEditor
            value={getValue<string>(item, ci) ?? ""}
            onValueChanged={(v) => {
              if (onStringValueChange) {
                onStringValueChange(item, ci.key, v);
              }
            }}
            readonly={ci.readonly}
          />
        );

      case "boolean":
        return (
          <DataBooleanEditor
            value={getValue<boolean>(item, ci) ?? false}
            onValueChanged={(v) => {
              if (onBooleanValueChange) {
                onBooleanValueChange(item, ci.key, v);
              }
            }}
          />
        );

      case "number":
        if (ci.readonly) {
          return getValue<number>(item, ci);
        }

        return (
          <DataNumberEditor
            value={getValue<number>(item, ci) ?? 0}
            onValueChanged={(v) => {
              if (onNumberValueChange) {
                onNumberValueChange(item, ci.key, v);
              }
            }}
          />
        );

      case "icon":
      {
        const icon = getValue<Icon>(item, ci);
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
      case "reference":
      {
        if (!getReferenceOptions) {
          return getDefaultValue(item, ci);
        }

        const referenceOptions = getReferenceOptions(ci.key);
        if (!referenceOptions) {
          return getDefaultValue(item, ci);
        }

        const id = getValue<string>(item, ci);

        if (ci.readonly) {
          const displayValue = referenceOptions.items.find(i => i.id === id);
          if (displayValue) {
            return displayValue.label;
          }
          else {
            return getDefaultValue(item, ci);
          }
        }

        return (
          <DataDropdownEditor
            collection={referenceOptions}
            selectedItemIds={id ? [id] : []}
            onSelectionChange={(ids: string[]) => {
              onReferenceValueChange?.(item, ci.key, ids);
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
    getReferenceOptions,
    getValue,
    handleIconDialogOpen,
    onBooleanValueChange,
    onNumberValueChange,
    onReferenceValueChange,
    onStringValueChange,
  ]);

  return (
    <Box display={"flex"} justifyContent={"center"} marginBottom={12}>
      <VStack rowGap={0}>
        <Table.Root variant={"outline"} showColumnBorder>
          <Table.Header>
            <Table.Row>
              {onDeleteRow && (
                <Table.ColumnHeader key={"table.actions"} w={6} padding={1}>
                  {onRevertAllChanges && (
                    <ConfirmIconButton
                      size={"sm"}
                      variant={"ghost"}
                      rounded={"full"}
                      onConfirmClick={() => {
                        onRevertAllChanges();
                      }}
                      confirm={{
                        variant: "outline",
                        color: "red",
                      }}
                    >
                      <FaUndo />
                    </ConfirmIconButton>
                  )}
                </Table.ColumnHeader>
              )}
              {onEditClick && (
                <Table.ColumnHeader
                  minW={"3rem"}
                  padding={0}
                  paddingX={1}
                  textAlign={"center"}
                  key={"table.edit"}
                />
              )}
              {columnInfo.map((ci) => {
                return (
                  <Table.ColumnHeader
                    minW={"3rem"}
                    padding={0}
                    paddingX={1}
                    textAlign={"center"}
                    key={ci.key.toString()}
                    minWidth={ci.minWidth}
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
                    <Table.Cell key={"table.actions.delete"} padding={1}>
                      <ConfirmIconButton
                        size={"sm"}
                        variant={"ghost"}
                        rounded={"full"}
                        color="red"
                        onConfirmClick={() => {
                          onDeleteRow(item);
                        }}
                        confirm={{ variant: "outline" }}
                      >
                        <FaTrash />
                      </ConfirmIconButton>
                    </Table.Cell>
                  )}
                  {onEditClick && (
                    <Table.Cell key={"table.actions.edit"} padding={1}>
                      <IconButton
                        size={"sm"}
                        variant={"ghost"}
                        rounded={"full"}
                        color={"gray"}
                        onClick={() => onEditClick(item)}
                      >
                        <FaRegEdit />
                      </IconButton>
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
          title={getFriendlyName ? `${getFriendlyName(selectedItem)} - ${selectedColumn.name}` : selectedColumn.name}
          onClose={handleIconDialogClose}
          onSelect={handleIconDialogChoice}
        />
      )}
    </Box>
  );
};

export default DataGrid;
