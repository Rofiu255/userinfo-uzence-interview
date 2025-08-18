import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

export interface Column<T> {
  key: keyof T;
  title: string;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (rows: T[]) => void;
}

const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [selected, setSelected] = useState<T[]>([]);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);

  const toggleRow = (row: T) => {
    if (!selectable) return;
    const exists = selected.includes(row);
    const newSelected = exists ? selected.filter(r => r !== row) : [...selected, row];
    setSelected(newSelected);
    onRowSelect?.(newSelected);
  };

  const clearSelection = () => {
    setSelected([]);
    onRowSelect?.([]);
  };

  if (loading) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">Loading...</p>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <>
        {error && <ErrorModal title={error.title} message={error.message} onConfirmError={() => setError(null)} />}
        <Card className="p-6 text-center">
          <p className="text-gray-500 mb-4">No data available</p>
          <Button type="button" onClick={() => setError({ title: "No Data", message: "There are no records to display." })}>
            Show Error
          </Button>
        </Card>
      </>
    );
  }

  return (
    <Card className="overflow-x-auto shadow-lg rounded-lg w-full">
      {error && <ErrorModal title={error.title} message={error.message} onConfirmError={() => setError(null)} />}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} onClick={() => toggleRow(row)} className={`cursor-pointer transition-colors ${selected.includes(row) ? "bg-blue-100" : idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}>
              {columns.map(col => (
                <td key={String(col.key)} className="px-6 py-4 text-sm text-gray-700">
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectable && selected.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button type="button" onClick={clearSelection}>
            Clear Selection ({selected.length})
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DataTable;
