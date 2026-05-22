import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div className={`rounded-lg border bg-white p-4 shadow-sm dark:bg-zinc-900 ${className}`}>
      {children}
    </div>
  );
}
