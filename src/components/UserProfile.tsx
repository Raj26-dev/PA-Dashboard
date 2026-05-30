"use client"
import React from 'react'

export const UserProfile: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-right mr-2">
        <div className="text-sm font-medium">Razorpay</div>
        <div className="text-xs text-gray-400">Admin</div>
      </div>
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">RP</div>
    </div>
  )
}

export default UserProfile
