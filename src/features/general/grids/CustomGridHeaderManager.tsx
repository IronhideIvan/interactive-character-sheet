import { DataDropdownItem } from "@/components/dataGrid/editors/DataDropdownEditor";
import { useAppDispatch } from "@/redux/hooks";
import { CustomGrid, CustomGridCell, CustomGridHeader, CustomGridRow } from "@/types/common/customGrid";
import { upsert } from "@/utils/arrayUtils";
import { Box, createListCollection, ListCollection } from "@chakra-ui/react";
import { JSX, useCallback } from "react";
import { resetCustomGrid, upsertCustomGrid } from "./customGridsSlice";
import { v4 } from "uuid";
import { CustomNoteType } from "@/types/common/customNote";
import DataGrid from "@/components/dataGrid/DataGrid";

type CustomGridHeaderManagerProps = {
  grid: CustomGrid;
};

const CustomGridHeaderManager = ({ grid }: CustomGridHeaderManagerProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const regenerateGrid = useCallback((existingGrid: CustomGrid, newHeaders: CustomGridHeader[]): CustomGrid => {
    // reorder all row cells, add any that don't exist, and remove any that aren't in the grid
    const newRows: CustomGridRow[] = [];
    existingGrid.rows.forEach((row) => {
      const newCells: CustomGridCell[] = [];
      const oldCells: CustomGridCell[] = [...row.cells];

      newHeaders.forEach((header) => {
        const cellIndex = oldCells.findIndex(cell => cell.headerId === header.id);
        if (cellIndex >= 0) {
          const cellToAdd = oldCells.splice(cellIndex, 1);
          newCells.push(cellToAdd[0]);
        }
        else {
          newCells.push({
            headerId: header.id,
            value: {},
          });
        }
      });

      newRows.push({
        ...row,
        cells: newCells,
      });
    });

    return {
      ...existingGrid,
      headers: newHeaders,
      rows: newRows,
    };
  }, []);

  const upsertHeader = useCallback((item: CustomGridHeader): void => {
    const previousLength = grid.headers.length;
    const newHeaders = upsert(item, grid.headers, header => header.id === item.id);
    let newGrid: CustomGrid = {
      ...grid,
      headers: newHeaders,
    };
    if (previousLength !== newHeaders.length) {
      newGrid = regenerateGrid(grid, newHeaders);
    }

    dispatch(upsertCustomGrid(newGrid));
  }, [
    dispatch,
    grid,
    regenerateGrid,
  ]);

  const handleGetReferenceOptions = useCallback((
    columnKey: keyof CustomGridHeader,
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
      type: "text",
    });
  }, [upsertHeader]);

  const handleDeleteRow = useCallback((item: CustomGridHeader) => {
    const newHeaders = grid.headers.filter(h => h.id === item.id);
    const newGrid = regenerateGrid(grid, newHeaders);
    dispatch(upsertCustomGrid(newGrid));
  }, [
    dispatch,
    grid,
    regenerateGrid,
  ]);

  const handleStringValueChanged = (item: CustomGridHeader, columnKey: keyof CustomGridHeader, value: string) => {
    let newItem: CustomGridHeader | undefined;
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

  const handleReferenceValueChanged = (item: CustomGridHeader, columnKey: keyof CustomGridHeader, value: string[]) => {
    if (value.length === 0) {
      return;
    }

    if (columnKey === "type") {
      const selectedType = value[0];
      const newItem: CustomGridHeader = { ...item, type: (selectedType as CustomNoteType) };
      upsertHeader(newItem);
    }
  };

  const handleRevert = () => {
    dispatch(resetCustomGrid(grid));
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <DataGrid
        items={grid.headers}
        columnInfo={[
          {
            name: "Name",
            key: "name",
            type: "text",
          },
          {
            name: "Type",
            key: "type",
            type: "reference",
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
  ],
  itemToValue: item => item.id,
});

export default CustomGridHeaderManager;
