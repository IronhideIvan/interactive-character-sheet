import DataGrid from "@/components/dataGrid/DataGrid";
import { ColumnInfo, EditorType } from "@/components/dataGrid/dataGridTypes";
import { CustomGrid, CustomGridCell, CustomGridCellType, CustomGridHeader, CustomGridRow, CustomGridValue } from "@/types/common/customGrid";
import { JSX, useCallback, useMemo } from "react";
import { upsertCustomGrid } from "./customGridsSlice";
import { v4 } from "uuid";
import { useAppDispatch } from "@/redux/hooks";
import { upsert } from "@/utils/arrayUtils";

type CustomGridProps = {
  grid: CustomGrid;
};

const CustomGridField = ({ grid }: CustomGridProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const upsertGridRows = useCallback((rows: CustomGridRow[]) => {
    dispatch(upsertCustomGrid({
      ...grid,
      rows: rows,
    }));
  }, [dispatch, grid]);

  const getEditorTypeForHeader = useCallback((header: CustomGridHeader): EditorType => {
    switch (header.type) {
      case "text":
        return EditorType.Text;
      case "boolean":
        return EditorType.Boolean;
      case "number":
        return EditorType.Number;
      case "markdown":
        return EditorType.Markdown;
      default:
        throw new Error(`Unknown header type '${header.type}' for header id '${header.id}'`);
    }
  }, []);

  const columnInfoList: ColumnInfo<CustomGridRow>[] = useMemo(() => {
    return grid.headers.map((h) => {
      return {
        name: h.name,
        key: h.id as keyof CustomGridRow,
        type: getEditorTypeForHeader(h),
      };
    });
  }, [getEditorTypeForHeader, grid.headers]);

  // eslint-disable-next-line @stylistic/comma-dangle
  const handleGetPropertyValue = useCallback(<ValueType,>(
    item: CustomGridRow,
    headerId: string,
    type: EditorType,
  ): ValueType => {
    const cell = item.cells.find(c => c.headerId === headerId);
    switch (type) {
      case EditorType.Markdown:
        return (cell?.value.string ?? "") as ValueType;
      case EditorType.Text:
        return (cell?.value.string ?? "") as ValueType;
      case EditorType.Boolean:
        return (cell?.value.boolean ?? false) as ValueType;
      case EditorType.Number:
        return (cell?.value.number ?? 0) as ValueType;
      default:
        throw new Error(`Unexpected editor type "${type}" provided for cell at row ID "${item.id}" and header ID "${cell?.headerId ?? "UNKNOWN"}". Serialized cell contents: ${JSON.stringify(cell)}`);
    }
  }, []);

  const buildRow = useCallback((headers: CustomGridHeader[]): CustomGridRow => {
    const getDefaultCellValueByType = (headerType: CustomGridCellType): CustomGridValue => {
      switch (headerType) {
        case "text": return { string: "" };
        case "boolean": return { boolean: false };
        case "markdown": return { string: "" };
        case "number": return { number: 0 };
      }
    };

    return {
      id: v4(),
      cells: headers.map((h): CustomGridCell => {
        return {
          headerId: h.id,
          type: h.type,
          value: getDefaultCellValueByType(h.type),
        };
      }),
    };
  }, []);

  const handleAddRow = useCallback(() => {
    upsertGridRows([
      ...grid.rows,
      buildRow(grid.headers),
    ]);
  }, [
    buildRow,
    grid,
    upsertGridRows,
  ]);

  const handleDeleteRow = useCallback((item: CustomGridRow) => {
    const newRows = grid.rows.filter(r => r.id !== item.id);
    upsertGridRows(newRows);
  }, [grid.rows, upsertGridRows]);

  const upsertGridCell = useCallback((headerId: string, newCellValue: CustomGridValue, row: CustomGridRow): void => {
    const cell = row.cells.find(c => c.headerId === headerId);
    if (!cell) {
      return;
    }

    const newCell: CustomGridCell = {
      ...cell,
      value: newCellValue,
    };

    const newCells = upsert(newCell, row.cells, it => it.headerId === newCell.headerId);
    const newRow: CustomGridRow = {
      ...row,
      cells: newCells,
    };

    upsertGridRows(upsert(newRow, grid.rows, r => r.id === newRow.id));
  }, [grid.rows, upsertGridRows]);

  const handleStringValueChanged = useCallback((item: CustomGridRow, headerId: string, value: string) => {
    upsertGridCell(headerId, { string: value }, item);
  }, [upsertGridCell]);

  const handleBooleanValueChanged = useCallback((item: CustomGridRow, headerId: string, value: boolean) => {
    upsertGridCell(headerId, { boolean: value }, item);
  }, [upsertGridCell]);

  const handleNumberValueChanged = useCallback((item: CustomGridRow, headerId: string, value: number) => {
    upsertGridCell(headerId, { number: value }, item);
  }, [upsertGridCell]);

  return (
    <DataGrid
      items={grid.rows}
      columnInfo={columnInfoList}
      getPropertyValue={handleGetPropertyValue}
      getId={item => item.id}
      onAddRow={handleAddRow}
      onDeleteRow={handleDeleteRow}
      onStringValueChange={handleStringValueChanged}
      onBooleanValueChange={handleBooleanValueChanged}
      onNumberValueChange={handleNumberValueChanged}
    />
  );
};

export default CustomGridField;
