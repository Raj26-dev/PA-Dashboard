// "use client"

// import React from "react";
// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="w-full border-b bg-white/60 backdrop-blur-sm dark:bg-black/60">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <h1 className="text-lg font-semibold">PA Dashboard</h1>
//           <nav className="hidden md:flex gap-4 text-sm text-zinc-600">
//             <Link href="/">Home</Link>
//             <Link href="/dashboard">Dashboard</Link>
//           </nav>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="px-3 py-1 rounded bg-zinc-100 text-sm">Account</button>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client"
import React from 'react'
// inline search icon to avoid external dependency
const SearchIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21L15 15" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="11" cy="11" r="6" stroke="#9CA3AF" strokeWidth="2" />
  </svg>
)
import NotificationBell from './NotificationBell'
import UserProfile from './UserProfile'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="hidden md:block w-72">
          <div className="relative">
            <input className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm" placeholder="Search here..." />
            <SearchIcon className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-600">Export Report</button>
        <NotificationBell />
        <UserProfile />
      </div>
    </header>
  )
}

export default Header

