"use client"

import React, { useEffect, useState } from "react";
import Card from "./Card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

type Slice = { name: string; value: number; key?: string };

type Props = {
  title?: string;
  data?: Slice[];
  className?: string;
};

const COLORS: Record<string, string> = {
  Success: "#10B981",
  Failed: "#FB7185",
  Pending: "#F59E0B",
};

function currencyCompact(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(2)}K`;
  return `${n}`;
}

export default function DonutChartCard({ title = "Transactions", data, className = "" }: Props) {
  const [slices, setSlices] = useState<Slice[] | null>(null);

  useEffect(() => {
    // If data provided, use it. Otherwise generate sample client-side only.
    if (data && data.length > 0) {
      setSlices(data);
      return;
    }

    const total = 1268540; // deterministic base for server parity; will be replaced on client
    const success = Math.round(total * 0.9534);
    const failed = Math.round(total * 0.0352);
    const pending = total - success - failed;

    setSlices([
      { name: "Success", value: success },
      { name: "Failed", value: failed },
      { name: "Pending", value: pending },
    ]);
  }, [data]);

  const total = (slices || []).reduce((s, r) => s + r.value, 0);
  const fmt = new Intl.NumberFormat('en-US');

  return (
    <Card className={`${className} border-none`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-zinc-500">{title}</div>
          <div className="text-lg font-semibold">Status Breakdown</div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center sm:items-stretch gap-4">
        <div className="flex-shrink-0" style={{ width: 200, height: 200, position: "relative" }}>
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={slices || []}
                dataKey="value"
                nameKey="name"
                innerRadius={68}
                outerRadius={92}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                isAnimationActive={false}
              >
                {(slices || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#CBD5E1"} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: string) => [currencyCompact(Number(value)), name]}
                wrapperStyle={{ boxShadow: "0 6px 18px rgba(15,23,42,0.08)", borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-sm text-zinc-500">Total transactions</div>
            <div className="text-2xl font-semibold">{fmt.format(total)}</div>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full">
            <div className="space-y-3">
              {(slices || []).map((s) => {
                const pct = total ? ((s.value / total) * 100).toFixed(2) : "0.00";
                return (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[s.name] }} />
                      <div className="text-sm text-zinc-700">{s.name}</div>
                    </div>

                    <div className="text-sm text-zinc-700 text-right">
                      <div className="font-semibold">{fmt.format(s.value)}</div>
                      <div className="text-xs text-zinc-400">{pct}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
