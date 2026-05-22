import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({ variant = "primary", className = "", ...rest }: Props) {
  const base = "px-3 py-2 rounded text-sm font-medium";
  const variants: Record<string, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}
