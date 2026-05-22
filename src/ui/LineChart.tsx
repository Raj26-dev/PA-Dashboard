import React from "react";

type Props = {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  className?: string;
};

export default function LineChart({ data, width = 400, height = 120, stroke = "#6366F1", className = "" }: Props) {
  if (!data || data.length === 0) return <div className={className}>No data</div>;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;

  return (
    <svg width={width} height={height} className={className} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={pathD} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${pathD} L ${width},${height} L 0,${height} Z`} fill="url(#g)" opacity={0.6} />
    </svg>
  );
}
