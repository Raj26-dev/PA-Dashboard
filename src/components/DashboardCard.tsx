import React from "react";

type Props = {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
};

export default function DashboardCard({ title, value, children }: Props) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-zinc-900">
      <h3 className="text-sm text-zinc-500">{title}</h3>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <div className="mt-3 text-sm text-zinc-600">{children}</div>
    </div>
  );
}
