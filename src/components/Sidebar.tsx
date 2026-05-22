"use client"

import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white/50 dark:bg-black/50 p-4 hidden md:block">
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="py-2 px-3 rounded hover:bg-zinc-100">Overview</Link>
        <Link href="#" className="py-2 px-3 rounded hover:bg-zinc-100">Analytics</Link>
        <Link href="#" className="py-2 px-3 rounded hover:bg-zinc-100">Reports</Link>
        <Link href="#" className="py-2 px-3 rounded hover:bg-zinc-100">Settings</Link>
      </nav>
    </aside>
  );
}
