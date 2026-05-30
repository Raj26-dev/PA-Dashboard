"use client"
import React from 'react'

const BellIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const NotificationBell: React.FC = () => {
  return (
    <button className="relative p-2 rounded-md hover:bg-gray-50">
      <BellIcon className="w-5 h-5 text-gray-600" />
      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full px-1">3</span>
    </button>
  )
}

export default NotificationBell
