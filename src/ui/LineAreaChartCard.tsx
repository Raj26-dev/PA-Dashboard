"use client"

import React, { useMemo, useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export type SeriesPoint = {
  label: string;
  total: number;
  success: number;
  failed: number;
};

type Props = {
  title?: string;
  subtitle?: string;
  data?: SeriesPoint[];
  className?: string;
};

function currency(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(2)}K`;
  return `${n}`;
}

export default function LineAreaChartCard({ title = "Transactions", subtitle = "Daily", data, className = "" }: Props) {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [generated, setGenerated] = useState<SeriesPoint[] | null>(null);

  useEffect(() => {
    // Generate sample data only on the client to avoid SSR/client mismatch
    if (data && data.length > 0) return;

    const makeDaily = (): SeriesPoint[] => {
      const arr: SeriesPoint[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = `${d.getMonth() + 1}/${d.getDate()}`;
        const total = Math.round(8000 + Math.random() * 12000);
        const success = Math.round(total * (0.85 + Math.random() * 0.12));
        const failed = total - success;
        arr.push({ label, total, success, failed });
      }
      return arr;
    };

    const makeWeekly = (): SeriesPoint[] => {
      const arr: SeriesPoint[] = [];
      for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i * 7);
        const label = `W${Math.ceil((d.getDate() + d.getMonth() * 30) / 7)}`;
        const total = Math.round(50000 + Math.random() * 80000);
        const success = Math.round(total * (0.86 + Math.random() * 0.10));
        const failed = total - success;
        arr.push({ label, total, success, failed });
      }
      return arr;
    };

    const makeMonthly = (): SeriesPoint[] => {
      const arr: SeriesPoint[] = [];
      for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const label = `${d.getMonth() + 1}/${d.getFullYear() % 100}`;
        const total = Math.round(200000 + Math.random() * 400000);
        const success = Math.round(total * (0.88 + Math.random() * 0.07));
        const failed = total - success;
        arr.push({ label, total, success, failed });
      }
      return arr;
    };

    if (period === "daily") setGenerated(makeDaily());
    else if (period === "weekly") setGenerated(makeWeekly());
    else setGenerated(makeMonthly());
  }, [period, data]);

  const baseData = data && data.length > 0 ? data : generated ?? [];

  return (
    <Card className={`col-span-2 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm text-zinc-500">{title}</div>
          <div className="text-lg font-semibold">{subtitle}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-3 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> Total
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Success
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" /> Failed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={period === "daily" ? "primary" : "ghost"} onClick={() => setPeriod("daily")}>
              Daily
            </Button>
            <Button variant={period === "weekly" ? "primary" : "ghost"} onClick={() => setPeriod("weekly")}>
              Weekly
            </Button>
            <Button variant={period === "monthly" ? "primary" : "ghost"} onClick={() => setPeriod("monthly")}>
              Monthly
            </Button>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={baseData} margin={{ top: 8, right: 24, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.16} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB7185" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="rgba(15,23,42,0.03)" />
            <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis tickFormatter={(v) => currency(Number(v))} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 6px 18px rgba(15,23,42,0.08)" }}
              formatter={(value: any, name: string) => [currency(Number(value)), name]}
            />

            <Area type="monotone" dataKey="total" stroke="#6366F1" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
            <Line type="monotone" dataKey="success" stroke="#10B981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="failed" stroke="#FB7185" strokeWidth={2} dot={false} />

            <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingTop: 8 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">
        <div>Showing {period.charAt(0).toUpperCase() + period.slice(1)} data</div>
        <div className="text-right">
          <div className="text-xs">Total</div>
          <div className="font-semibold">{currency(baseData.reduce((s, r) => s + r.total, 0))}</div>
        </div>
      </div>
    </Card>
  );
}
