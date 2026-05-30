// "use client"

// import React from "react";
// import Link from "next/link";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 border-r bg-white/50 dark:bg-black/50 p-4 hidden md:block">
//       <nav className="flex flex-col gap-2">
//         <Link href="/dashboard" className="py-2 px-3 rounded hover:bg-zinc-100">Overview</Link>
//         <Link href="#" className="py-2 px-3 rounded hover:bg-zinc-100">Analytics</Link>
//         <Link href="#" className="py-2 px-3 rounded hover:bg-zinc-100">Reports</Link>
//         <Link href="#" className="py-2 px-3 rounded hover:bg-zinc-100">Settings</Link>
//       </nav>
//     </aside>
//   );
// }
"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import sidebarItems from '../constants/sidebar'

export const Sidebar: React.FC = () => {
  const pathname = usePathname() || '/dashboard'

  return (
    <aside className="w-56 bg-white border-r border-gray-100 h-screen sticky top-0 px-3 py-6">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">NB</div>
        <div>
          <div className="text-sm font-semibold">NBBL</div>
          <div className="text-xs text-gray-400">PA Dashboard</div>
        </div>
      </div>

      <nav className="space-y-2 px-1">
        {sidebarItems.map((item) => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                active ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}>
              <item.icon className={`w-6 h-6 ${active ? 'text-purple-600' : 'text-gray-500'}`} />
              <span className="ml-1">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
