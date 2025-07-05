import { DataDropdownItem } from "@/components/dataGrid/editors/DataDropdownEditor";
import { useAppDispatch } from "@/redux/hooks";
import { upsert } from "@/utils/arrayUtils";
import { Box, createListCollection, ListCollection } from "@chakra-ui/react";
import { JSX, useCallback } from "react";
import { v4 } from "uuid";
import DataGrid from "@/components/dataGrid/DataGrid";
import { EditorType } from "@/components/dataGrid/dataGridTypes";
import { resetDataSet, upsertDataSet } from "./dataSetSlice";
import { DataSetCell, DataSetHeader, DataSetProto, DataSetRow, DataSetRowCell, DataSetValueType } from "@/types/data/dataset";
import { ID } from "@/types/common/entityBase";
import { buildEmptyCell, convertToRowCell } from "./dataSetUtils";

type DataSetHeaderManagerProps = {
  dataset: DataSetProto;
};

const DataSetHeaderManager = ({ dataset }: DataSetHeaderManagerProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const regenerateDataSet = useCallback((existingDataSet: DataSetProto, newHeaders: DataSetHeader[]): DataSetProto => {
    // reorder all row cells, add any that don't exist, and remove any that aren't in the grid
    const newRows: DataSetRow[] = [];
    const newCellDict: Map<ID, DataSetCell> = new Map();
    const oldCellDict: Map<ID, DataSetCell> = new Map(existingDataSet.cells);

    existingDataSet.rows.forEach((row) => {
      const newRowCells: DataSetRowCell[] = [];
      const oldRowCells: DataSetRowCell[] = [...row.cells];

      newHeaders.forEach((header) => {
        const rowCellIndex = oldRowCells.findIndex(cell => cell.headerId === header.id);
        if (rowCellIndex >= 0) {
          const rowCellToAdd = oldRowCells.splice(rowCellIndex, 1)[0];
          let existingCell = oldCellDict.get(rowCellToAdd.cellId);
          if (!existingCell) {
            existingCell = buildEmptyCell(header);
          }

          if (existingCell.type !== header.type) {
            existingCell = buildEmptyCell(header);
          }

          newCellDict.set(existingCell.id, existingCell);
          newRowCells.push(convertToRowCell(existingCell));
        }
        else {
          const newCell = buildEmptyCell(header);
          newCellDict.set(newCell.id, newCell);
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
    const previousLength = dataset.headers.length;
    const newHeaders = upsert(item, dataset.headers, header => header.id === item.id);
    let newGrid: DataSetProto = {
      ...dataset,
      headers: newHeaders,
    };
    if (previousLength !== newHeaders.length) {
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
      type: DataSetValueType.Text,
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
      const newItem: DataSetHeader = { ...item, type: (selectedType as DataSetValueType) };
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
      id: "text",
      label: "Text",
    },
    {
      id: "boolean",
      label: "True/False",
    },
    {
      id: "number",
      label: "Number",
    },
    {
      id: "markdown",
      label: "Markdown",
    },
    {
      id: "icon",
      label: "Icon",
    },
  ],
  itemToValue: item => item.id,
});

export default DataSetHeaderManager;
