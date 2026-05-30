import React from "react";

type Column<T> = { key: keyof T; title: string; render?: (row: T) => React.ReactNode };

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
};

export default function Table<T>({ columns, data, className = "" }: Props<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-zinc-500">
            {columns.map((c) => (
              <th key={String(c.key)} className="py-2 px-3">
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map((c) => (
                <td key={String(c.key)} className="py-2 px-3">
                  {c.render ? c.render(row) : (row[c.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
