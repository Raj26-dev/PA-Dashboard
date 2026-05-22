"use client"

import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/60 backdrop-blur-sm dark:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">PA Dashboard</h1>
          <nav className="hidden md:flex gap-4 text-sm text-zinc-600">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1 rounded bg-zinc-100 text-sm">Account</button>
        </div>
      </div>
    </header>
  );
}
