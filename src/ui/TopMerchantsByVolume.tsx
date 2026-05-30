"use client"

import React from "react";

export type MerchantData = {
  merchant: string;
  transactions: number;
  amount: string; // formatted e.g. "₹98.65 Cr"
  successRate: number; // 0-100
};

type Props = {
  data?: MerchantData[];
  className?: string;
};

const DEFAULT_DATA: MerchantData[] = [
  { merchant: "Amazon", transactions: 245672, amount: "₹98.65 Cr", successRate: 96.32 },
  { merchant: "Flipkart", transactions: 182946, amount: "₹72.34 Cr", successRate: 95.11 },
  { merchant: "Myntra", transactions: 125430, amount: "₹45.25 Cr", successRate: 94.55 },
  { merchant: "Nykaa", transactions: 98234, amount: "₹28.65 Cr", successRate: 95.81 },
  { merchant: "Others", transactions: 616258, amount: "₹257.79 Cr", successRate: 95.22 },
];

function formatNumber(n: number) {
  return n.toLocaleString();
}

function SuccessProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[72px] h-[8px] rounded-[999px] bg-[#D8F5E7] overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-[999px] bg-[#49C48D]"
          style={{ width: `${pct}%` }}
        />
        {/* small lighter cap at the filled edge */}
        {pct > 0 && (
          <div
            className="absolute top-[-2px] h-[12px] w-[6px] rounded-sm bg-[#7FE3B0]"
            style={{ left: `calc(${pct}% - 3px)` }}
          />
        )}
      </div>
      <div className="text-[17px] font-medium text-[#8C8C8C]">{pct.toFixed(2)}%</div>
    </div>
  );
}

export default function TopMerchantsByVolume({ data = DEFAULT_DATA, className = "" }: Props) {
  return (
    <div
      className={`bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm pt-6 pb-6 pl-[28px] pr-[28px] ${className}`}
    >
      <div className="mb-[28px]">
        <div className="text-[18px] font-medium text-[#7A7A7A] leading-[28px]">Top Merchants by Volume</div>
      </div>

      <div className="mb-[18px]">
        <div
          className="grid items-center"
          style={{ gridTemplateColumns: "1.4fr 1.2fr 1.3fr 1.5fr" }}
        >
          <div className="text-[13px] font-normal text-[#B5B5B5]">Merchant</div>
          <div className="text-[13px] font-normal text-[#B5B5B5]">Transactions</div>
          <div className="text-[13px] font-normal text-[#B5B5B5]">Amount(₹)</div>
          <div className="text-[13px] font-normal text-[#B5B5B5]">Success Rate</div>
        </div>
      </div>

      <div className="grid gap-y-[18px]">
        {data.map((row, idx) => {
          const isHighlight = row.merchant === "Flipkart"; // highlight Flipkart transactions
          return (
              <div
                key={row.merchant}
                className="grid items-center h-[40px] transform transition-transform duration-150 ease-out hover:-translate-y-1"
                style={{ gridTemplateColumns: "1.4fr 1.2fr 1.3fr 1.5fr" }}
              >
              <div className="text-[17px] font-normal text-[#8A8A8A]">{row.merchant}</div>

              <div className={`${isHighlight ? "font-semibold" : "font-normal"} text-[17px]`}>
                {formatNumber(row.transactions)}
              </div>

              <div className="text-[17px] font-normal text-[#8A8A8A]">{row.amount}</div>

              <div className="flex items-center justify-start">
                <SuccessProgressBar value={row.successRate} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
