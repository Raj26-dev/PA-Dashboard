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

type Slice = { name: string; value: number };

type Props = {
  title?: string;
  data?: Slice[];
  className?: string;
};

const COLORS: Record<string, string> = {
  Timeout: "#7C3AED",
  "Insufficient Funds": "#F97316",
  "Invalid Account": "#06B6D4",
  "User Cancelled": "#3B82F6",
  "Bank Error": "#FB7185",
};

function percent(value: number, total: number) {
  if (!total) return "0.00%";
  return `${((value / total) * 100).toFixed(2)}%`;
}

export default function FailureDonutCard({ title = "Failure Analysis (by Error Code)", data, className = "" }: Props) {
  const [slices, setSlices] = useState<Slice[] | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setSlices(data);
      return;
    }

    // Generate deterministic sample data on client only
    const sample = [
      { name: "Timeout", value: 9234 },
      { name: "Insufficient Funds", value: 18745 },
      { name: "Invalid Account", value: 14532 },
      { name: "User Cancelled", value: 21123 },
      { name: "Bank Error", value: 7645 },
    ];

    setSlices(sample);
  }, [data]);

  const total = (slices || []).reduce((s, r) => s + r.value, 0);
  const fmt = new Intl.NumberFormat('en-US');

  return (
    <Card className={`${className} border-none`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-zinc-500">{title}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-shrink-0" style={{ width: 220, height: 220, position: "relative" }}>
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={slices || []}
                dataKey="value"
                nameKey="name"
                innerRadius={72}
                outerRadius={100}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                isAnimationActive={false}
              >
                {(slices || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#E5E7EB"} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: string) => [new Intl.NumberFormat('en-US').format(Number(value)), name]}
                wrapperStyle={{ boxShadow: "0 6px 18px rgba(15,23,42,0.08)", borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-sm text-zinc-500">Total</div>
            <div className="text-2xl font-semibold">{fmt.format(total)}</div>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full">
            <div className="space-y-3">
              {(slices || []).map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[s.name] }} />
                    <div className="text-sm text-zinc-700">{s.name}</div>
                  </div>

                  <div className="text-sm text-zinc-700 text-right">
                    <div className="font-semibold">{fmt.format(s.value)}</div>
                    <div className="text-xs text-zinc-400">{percent(s.value, total)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
