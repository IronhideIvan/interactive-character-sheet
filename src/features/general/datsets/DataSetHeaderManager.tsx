import { DataDropdownItem } from "@/components/dataGrid/editors/DataDropdownEditor";
import { useAppDispatch } from "@/redux/hooks";
import { upsert } from "@/utils/arrayUtils";
import { Box, createListCollection, ListCollection } from "@chakra-ui/react";
import { JSX, useCallback } from "react";
import { v4 } from "uuid";
import DataGrid from "@/components/dataGrid/DataGrid";
import { EditorType } from "@/components/dataGrid/dataGridTypes";
import { resetDataSet, upsertDataSet } from "./dataSetSlice";
import { DataSetCell, DataSetHeader, DataSetProto, DataSetRow, DataSetRowCell } from "@/types/data/dataset";
import { buildEmptyCell, convertToRowCell } from "./dataSetUtils";
import { Dictionary } from "@/types/common/dictionary";
import { DataObjectValueType } from "@/types/data/dataObject";

type DataSetHeaderManagerProps = {
  dataset: DataSetProto;
};

const DataSetHeaderManager = ({ dataset }: DataSetHeaderManagerProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const regenerateDataSet = useCallback((existingDataSet: DataSetProto, newHeaders: DataSetHeader[]): DataSetProto => {
    // reorder all row cells, add any that don't exist, and remove any that aren't in the grid
    const newRows: DataSetRow[] = [];
    const newCellDict: Dictionary<DataSetCell> = {};
    const oldCellDict: Dictionary<DataSetCell> = { ...existingDataSet.cells };

    existingDataSet.rows.forEach((row) => {
      const newRowCells: DataSetRowCell[] = [];
      const oldRowCells: DataSetRowCell[] = [...row.cells];

      newHeaders.forEach((header) => {
        const rowCellIndex = oldRowCells.findIndex(cell => cell.headerId === header.id);
        if (rowCellIndex >= 0) {
          const rowCellToAdd = oldRowCells.splice(rowCellIndex, 1)[0];
          let existingCell = oldCellDict[rowCellToAdd.cellId];
          if (!existingCell || existingCell.type !== header.type) {
            existingCell = buildEmptyCell(header);
          }

          newCellDict[existingCell.id] = existingCell;
          newRowCells.push(convertToRowCell(existingCell));
        }
        else {
          const newCell = buildEmptyCell(header);
          newCellDict[newCell.id] = newCell;
          newRowCells.push(convertToRowCell(newCell));
        }
      });

      newRows.push({
        ...row,
        cells: newRowCells,
      });
    });

    return {
      ...existingDataSet,
      headers: newHeaders,
      rows: newRows,
      cells: newCellDict,
    };
  }, []);

  const upsertHeader = useCallback((item: DataSetHeader): void => {
    const previousHeader = dataset.headers.find(h => h.id === item.id);
    const newHeaders = upsert(item, dataset.headers, header => header.id === item.id);
    let newGrid: DataSetProto = {
      ...dataset,
      headers: newHeaders,
    };
    if (!previousHeader || previousHeader.type !== item.type) {
      newGrid = regenerateDataSet(dataset, newHeaders);
    }

    dispatch(upsertDataSet(newGrid));
  }, [
    dispatch,
    dataset,
    regenerateDataSet,
  ]);

  const handleGetReferenceOptions = useCallback((
    columnKey: keyof DataSetHeader,
  ): ListCollection<DataDropdownItem> => {
    if (columnKey === "type") {
      return typeReferenceOptions;
    }
    else {
      throw new Error(`unknown type ${columnKey}`);
    }
  }, []);

  const handleAddRow = useCallback(() => {
    upsertHeader({
      id: v4(),
      name: "",
      type: DataObjectValueType.Text,
    });
  }, [upsertHeader]);

  const handleDeleteRow = useCallback((item: DataSetHeader) => {
    const newHeaders = dataset.headers.filter(h => h.id !== item.id);
    const newGrid = regenerateDataSet(dataset, newHeaders);
    dispatch(upsertDataSet(newGrid));
  }, [
    dispatch,
    dataset,
    regenerateDataSet,
  ]);

  const handleStringValueChanged = (item: DataSetHeader, columnKey: keyof DataSetHeader, value: string) => {
    let newItem: DataSetHeader | undefined;
    switch (columnKey) {
      case "name":
        newItem = { ...item, name: value };
        break;
      default:
        break;
    }

    if (newItem) {
      upsertHeader(newItem);
    }
  };

  const handleReferenceValueChanged = (item: DataSetHeader, columnKey: keyof DataSetHeader, value: string[]) => {
    if (value.length === 0) {
      return;
    }

    if (columnKey === "type") {
      const selectedType = value[0];
      const newItem: DataSetHeader = { ...item, type: (selectedType as DataObjectValueType) };
      upsertHeader(newItem);
    }
  };

  const handleRevert = () => {
    dispatch(resetDataSet(dataset));
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={dataset.headers}
        columnInfo={[
          {
            name: "Name",
            key: "name",
            type: EditorType.Text,
          },
          {
            name: "Type",
            key: "type",
            type: EditorType.Reference,
            minWidth: "10rem",
          },
        ]}
        getId={(item) => {
          return item.id;
        }}
        getFriendlyName={(item) => {
          return item.name;
        }}
        getReferenceOptions={handleGetReferenceOptions}
        onReferenceValueChange={handleReferenceValueChanged}
        onStringValueChange={handleStringValueChanged}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onRevertAllChanges={handleRevert}
      />
    </Box>
  );
};

const typeReferenceOptions = createListCollection<DataDropdownItem>({
  items: [
    {
      id: DataObjectValueType.Text,
      label: "Text",
    },
    {
      id: DataObjectValueType.Boolean,
      label: "True/False",
    },
    {
      id: DataObjectValueType.Number,
      label: "Number",
    },
    {
      id: DataObjectValueType.Markdown,
      label: "Markdown",
    },
    {
      id: DataObjectValueType.Icon,
      label: "Icon",
    },
  ],
  itemToValue: item => item.id,
});

export default DataSetHeaderManager;
