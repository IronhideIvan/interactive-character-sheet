import { Dictionary } from "@/types/common/dictionary";
import { DataSetCell, DataSetHeader, DataSetProto, DataSetRow, DataSetRowCell } from "@/types/data/dataset";
import { v4 } from "uuid";
import { getDefaultDataObjectValueByType } from "../dataObjects/dataObjectUtil";

export const buildEmptyCell = (header: DataSetHeader): DataSetCell => {
  return {
    id: v4(),
    headerId: header.id,
    value: getDefaultDataObjectValueByType(header.type),
    type: header.type,
  };
};

export const convertToRowCell = (cell: DataSetCell): DataSetRowCell => {
  return {
    cellId: cell.id,
    headerId: cell.headerId,
  };
};

export const addNewRowToDataSet = (dataset: DataSetProto): DataSetProto => {
  const newCells: Dictionary<DataSetCell> = { ...dataset.cells };
  const newRowCells: DataSetRowCell[] = [];

  dataset.headers.forEach((h) => {
    const cell = buildEmptyCell(h);
    newCells[cell.id] = cell;
    newRowCells.push(convertToRowCell(cell));
  });

  const newRow: DataSetRow = {
    id: v4(),
    cells: newRowCells,
  };

  return {
    ...dataset,
    rows: [
      ...dataset.rows,
      newRow,
    ],
    cells: newCells,
  };
};

export const deleteRowFromDataSet = (row: DataSetRow, dataset: DataSetProto): DataSetProto => {
  const newRows = dataset.rows.filter(r => r.id !== row.id);
  const newCells: Dictionary<DataSetCell> = { ...dataset.cells };
  row.cells.forEach((c) => {
    delete newCells[c.cellId];
  });

  return {
    ...dataset,
    rows: newRows,
    cells: newCells,
  };
};
