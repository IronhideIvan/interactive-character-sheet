import DataGrid from "@/components/dataGrid/DataGrid";
import { ColumnInfo, EditorType } from "@/components/dataGrid/dataGridTypes";
import { JSX, useCallback, useMemo } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { DataSetHeader, DataSetProto, DataSetRow, DataSetValue } from "@/types/data/dataset";
import { upsertDataSet } from "./dataSetSlice";
import { ID } from "@/types/common/entityBase";
import { addNewRowToDataSet, deleteRowFromDataSet } from "./dataSetUtils";
import { Icon } from "@/types/data/icon";

type DataSetFieldProps = {
  dataset: DataSetProto;
};

const DataSetField = ({ dataset }: DataSetFieldProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const upsertDataSetRows = useCallback((newDataSet: DataSetProto) => {
    dispatch(upsertDataSet({
      ...newDataSet,
      rows: newDataSet.rows,
      cells: newDataSet.cells,
    }));
  }, [dispatch]);

  const getEditorTypeForHeader = useCallback((header: DataSetHeader): EditorType => {
    switch (header.type) {
      case "text":
        return EditorType.Text;
      case "boolean":
        return EditorType.Boolean;
      case "number":
        return EditorType.Number;
      case "markdown":
        return EditorType.Markdown;
      case "icon":
        return EditorType.Icon;
      default:
        throw new Error(`Unknown header type '${header.type}' for header id '${header.id}'`);
    }
  }, []);

  const columnInfoList: ColumnInfo<DataSetRow>[] = useMemo(() => {
    return dataset.headers.map((h) => {
      return {
        name: h.name,
        key: h.id as keyof DataSetRow,
        type: getEditorTypeForHeader(h),
      };
    });
  }, [getEditorTypeForHeader, dataset.headers]);

  // eslint-disable-next-line @stylistic/comma-dangle
  const handleGetPropertyValue = useCallback(<ValueType,>(
    item: DataSetRow,
    headerId: string,
    type: EditorType,
  ): ValueType => {
    const rowCell = item.cells.find(c => c.headerId === headerId);
    if (!rowCell) {
      throw new Error(`Row '${item.id}' on dataset '${dataset.id}' does `
        + `not contain any cells with header ID '${headerId}'`);
    }

    const cell = dataset.cells.get(rowCell.cellId);
    if (!cell) {
      throw new Error(`Cell '${rowCell.cellId}' does not exist on dataset '${dataset.id}'`);
    }

    switch (type) {
      case EditorType.Icon:
        return (cell?.value.icon ?? { id: "", color: "" }) as ValueType;
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
  }, [dataset.cells, dataset.id]);

  const handleAddRow = useCallback(() => {
    upsertDataSetRows(addNewRowToDataSet(dataset));
  }, [dataset, upsertDataSetRows]);

  const handleDeleteRow = useCallback((item: DataSetRow) => {
    upsertDataSetRows(deleteRowFromDataSet(item, dataset));
  }, [dataset, upsertDataSetRows]);

  const upsertGridCell = useCallback((headerId: ID, newCellValue: DataSetValue, row: DataSetRow): void => {
    const rowCell = row.cells.find(c => c.headerId === headerId);
    if (!rowCell) {
      return;
    }

    const cell = dataset.cells.get(rowCell.cellId);
    if (!cell) {
      return;
    }

    const newCells = new Map(dataset.cells);
    newCells.set(cell.id, {
      ...cell,
      value: newCellValue,
    });

    upsertDataSetRows({
      ...dataset,
      cells: newCells,
    });
  }, [dataset, upsertDataSetRows]);

  const handleStringValueChanged = useCallback((item: DataSetRow, headerId: string, value: string) => {
    upsertGridCell(headerId, { string: value }, item);
  }, [upsertGridCell]);

  const handleBooleanValueChanged = useCallback((item: DataSetRow, headerId: string, value: boolean) => {
    upsertGridCell(headerId, { boolean: value }, item);
  }, [upsertGridCell]);

  const handleNumberValueChanged = useCallback((item: DataSetRow, headerId: string, value: number) => {
    upsertGridCell(headerId, { number: value }, item);
  }, [upsertGridCell]);

  const handleIconValueChanged = useCallback((item: DataSetRow, headerId: string, value: Icon) => {
    upsertGridCell(headerId, { icon: value }, item);
  }, [upsertGridCell]);

  return (
    <DataGrid
      items={dataset.rows}
      columnInfo={columnInfoList}
      getPropertyValue={handleGetPropertyValue}
      getId={item => item.id}
      onAddRow={handleAddRow}
      onDeleteRow={handleDeleteRow}
      onStringValueChange={handleStringValueChanged}
      onBooleanValueChange={handleBooleanValueChanged}
      onNumberValueChange={handleNumberValueChanged}
      onIconValueChange={handleIconValueChanged}
    />
  );
};

export default DataSetField;
