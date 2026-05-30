import React from 'react'

const LayoutDashboard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
    <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
    <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
    <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
  </svg>
)

const CreditCard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="8" width="6" height="2" fill="currentColor" />
  </svg>
)

const BarChart2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="6" width="4" height="15" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="17" y="2" width="4" height="19" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6 11c1.657 0 3-1.567 3-3.5S7.657 4 6 4 3 5.567 3 7.5 4.343 11 6 11z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2 20c0-2.5 3-4.5 6-4.5s6 2 6 4.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const Bank = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10l9-6 9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v6a2 2 0 002 2h10a2 2 0 002-2v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14v4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 14v4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const FileText = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 3v4a1 1 0 001 1h4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 16h8" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const Settings = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 012.27 16.9l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82L4.21 2.27A2 2 0 016.04 2.27l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09c.14.68.66 1.22 1.34 1.34.68.14 1.22.66 1.34 1.34V9a1.65 1.65 0 001.51 1h.09a2 2 0 010 4h-.09c-.68.14-1.22.66-1.34 1.34V15a1.65 1.65 0 001 1.51z" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export const sidebarItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'Transactions', icon: CreditCard, href: '/transactions' },
  { title: 'Analytics', icon: BarChart2, href: '/analytics' },
  { title: 'Merchants', icon: Users, href: '/merchants' },
  { title: 'Banks', icon: Bank, href: '/banks' },
  { title: 'Reports', icon: FileText, href: '/reports' },
  { title: 'Settings', icon: Settings, href: '/settings' },
]

export default sidebarItems
