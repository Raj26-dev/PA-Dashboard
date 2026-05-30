"use client"
import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Props> = (props) => {
  return <input className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" {...props} />
}

export default Input
