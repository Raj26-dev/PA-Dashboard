"use client"

import React from "react";
import Card from "./Card";

type Row = {
  code: string | number;
  description: string;
  count: number;
  percent: number; // 0-100
};

type Props = {
  title?: string;
  data?: Row[];
  className?: string;
  maxHeight?: number;
};

const sample: Row[] = [
  { code: 101, description: "INSUFFICIENT_FUNDS", count: 8456, percent: 18.45 },
  { code: 104, description: "INVALID_ACCOUNT", count: 6861, percent: 14.32 },
  { code: 201, description: "USER_CANCELLED", count: 5542, percent: 12.11 },
  { code: 408, description: "TIMEOUT", count: 4234, percent: 9.23 },
  { code: 500, description: "BANK_ERROR", count: 3418, percent: 7.45 },
];

export default function TopErrorCodesTable({ title = "Top Error Codes", data, className = "", maxHeight = 220 }: Props) {
  const rows = data && data.length > 0 ? data : sample;

  return (
    <Card className={className}>
      <div className="mb-3">
        <div className="text-sm text-zinc-500">{title}</div>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight }}>
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-white">
            <tr className="text-zinc-400 text-xs uppercase tracking-wide">
              <th className="py-3 px-4 font-medium">Error Code</th>
              <th className="py-3 px-4 font-medium">Description</th>
              <th className="py-3 px-4 font-medium text-right">Count</th>
              <th className="py-3 px-4 font-medium text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t last:border-b">
                <td className="py-3 px-4 text-sm text-zinc-600">{r.code}</td>
                <td className="py-3 px-4 text-sm text-zinc-500">{r.description}</td>
                <td className="py-3 px-4 text-sm text-zinc-700 text-right font-medium">{r.count.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-zinc-400 text-right">{r.percent.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
