"use client"

import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import Card from "./Card";

export type ChartData = {
  date: string; // e.g. '1 May'
  transactions: number; // raw count
  paymentValue: number; // in Crores (e.g. 352 means 352 Cr)
};

type Props = {
  data?: ChartData[];
  className?: string;
};

const DEFAULT_DATA: ChartData[] = [
  { date: "1 May", transactions: 11800000, paymentValue: 352 },
  { date: "2 May", transactions: 9200000, paymentValue: 287 },
  { date: "3 May", transactions: 7500000, paymentValue: 241 },
  { date: "4 May", transactions: 12100000, paymentValue: 335 },
  { date: "5 May", transactions: 15300000, paymentValue: 428 },
  { date: "6 May", transactions: 13600000, paymentValue: 389 },
  { date: "7 May", transactions: 15700000, paymentValue: 512 },
  { date: "8 May", transactions: 7800000, paymentValue: 276 },
];

function formatTransactions(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return `${n}`;
}

function formatPayment(n: number) {
  return `₹${n} Cr`;
}

function ChartHeader({ title }: { title: string }) {
  return (
    <div className="flex items-start justify-between w-full">
      <div>
        <div className="text-[22px] font-extrabold text-[#1D2340] leading-[28px] tracking-[-0.2px]">
          {title}
        </div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-7">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-gradient-to-b from-[#7A4DFF] to-[#5C39F4] inline-block" />
        <div className="text-[14px] font-medium text-[#5C627A]">Transactions (Count)</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#E78A34] inline-block" />
        <div className="text-[14px] font-medium text-[#5C627A]">Payment Value (₹)</div>
      </div>
    </div>
  );
}

function ToggleButtons({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange("daily")}
        className={`w-20 h-10 rounded-[10px] text-white text-sm font-medium shadow-sm ${
          value === "daily" ? "bg-gradient-to-br from-[#7C4DFF] to-[#5F35F5]" : "bg-white border border-[#ECECEC] text-[#444]"
        }`}
      >
        Daily
      </button>
      <button
        onClick={() => onChange("hourly")}
        className={`w-20 h-10 rounded-[10px] text-sm font-medium ${
          value === "hourly" ? "bg-gradient-to-br from-[#7C4DFF] to-[#5F35F5] text-white" : "bg-white border border-[#ECECEC] text-[#444]"
        }`}
      >
        Hourly
      </button>
      <button className="w-10 h-10 rounded-md bg-white border border-[#ECECEC] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6B7280">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v.01M12 12v.01M12 18v.01" />
        </svg>
      </button>
    </div>
  );
}

export default function TransactionsComboChart({ data = DEFAULT_DATA, className = "" }: Props) {
  const [period, setPeriod] = useState("daily");

  const txMap = useMemo(() => {
    const m: Record<string, string> = {};
    data.forEach((d) => (m[d.date] = formatTransactions(d.transactions)));
    return m;
  }, [data]);

  return (
    // <Card className={`col-span-2 ${className}`}>
    <div className={`col-span-2 bg-white rounded-[24px] border border-[#F1F1F1] shadow-sm p-[24px] pb-[18px] ${className}`}>
      <div className="flex items-start justify-between mb-5">
        <div className="flex flex-col">
          <ChartHeader title={"Transactions (Count) & Payment Value (₹) Over Time"} />
          <div className="mt-5">
            <Legend />
          </div>
        </div>
        <div className="flex items-start">
          <ToggleButtons value={period} onChange={setPeriod} />
        </div>
      </div>

      <div style={{ width: "100%", height: 420 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 30, right: 30, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7A4DFF" />
                <stop offset="100%" stopColor="#5C39F4" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="" horizontal={true} vertical={false} stroke="#F3F4F6" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#70758A", fontSize: 14, fontWeight: 500 }}
              height={60}
              tickFormatter={(val) => val}
              tick={({ x, y, payload }) => {
                const tx = txMap[payload.value] || "";
                return (
                  <g transform={`translate(${x},${y + 8})`}>
                    <text x={0} y={-10} textAnchor="middle" style={{ fontSize: 18, fontWeight: 700, fill: '#2D5BFF' }}>
                      {tx}
                    </text>
                    <text x={0} y={12} textAnchor="middle" style={{ fontSize: 14, fontWeight: 500, fill: '#70758A' }}>
                      {payload.value}
                    </text>
                  </g>
                );
              }}
            />

            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={(v) => `${v / 1000000}M`}
              tick={{ fill: "#8B91A7", fontSize: 13 }}
              axisLine={false}
              tickCount={10}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(v) => `₹${v} Cr`}
              tick={{ fill: "#8B91A7", fontSize: 13 }}
              axisLine={false}
            />

            <Tooltip
              labelFormatter={(label) => label}
              formatter={(value: any, name: string) => {
                if (name === "transactions") return [formatTransactions(value), "Transactions"];
                if (name === "paymentValue") return [formatPayment(value), "Payment Value"];
                return [value, name];
              }}
              contentStyle={{ borderRadius: 8, boxShadow: "0 6px 18px rgba(15,23,42,0.08)" }}
            />

            <Bar
              dataKey="transactions"
              yAxisId="left"
              barSize={28}
              radius={[12, 12, 12, 12]}
              fill="url(#barGrad)"
            />

            <Line
              type="monotone"
              dataKey="paymentValue"
              yAxisId="right"
              stroke="#E78A34"
              strokeWidth={3}
              dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#E78A34' }}
            >
              <LabelList
                dataKey="paymentValue"
                position="top"
                formatter={(val: number) => `₹${val} Cr`}
                style={{ fontSize: 16, fontWeight: 700, fill: '#D57A22' }}
              />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
    // </Card>
  );
}
