"use client"
import React, { useState, useRef, useEffect } from 'react'

type Option = { label: string; value: string }
type Props = React.HTMLAttributes<HTMLDivElement> & { options?: Option[]; value?: string; onChange?: (v: string) => void; searchable?: boolean }

export const Select: React.FC<Props> = ({ options = [], value, onChange, searchable = false }) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [focusIndex, setFocusIndex] = useState<number>(-1)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (!open) setFocusIndex(-1)
  }, [open])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusIndex((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (focusIndex >= 0 && focusIndex < filtered.length) {
        const sel = filtered[focusIndex]
        onChange?.(sel.value)
        setOpen(false)
        setQuery('')
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((s) => !s)} className="border border-gray-200 rounded-md px-3 py-2 w-full text-left">
        {options.find((o) => o.value === value)?.label || 'Select'}
      </button>
      {open && (
        <div onKeyDown={onKeyDown} tabIndex={0} className="absolute z-30 mt-1 w-full bg-white border border-gray-100 rounded-md shadow-md">
          {searchable && (
            <div className="p-2">
              <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full px-2 py-1 border rounded text-sm" placeholder="Search..." />
            </div>
          )}
          <ul className="max-h-48 overflow-auto">
            {filtered.map((o) => (
              <li
                key={o.value}
                className={`px-3 py-2 hover:bg-gray-50 cursor-pointer ${focusIndex === filtered.indexOf(o) ? 'bg-gray-100' : ''}`}
                onMouseEnter={() => setFocusIndex(filtered.indexOf(o))}
                onClick={() => {
                  onChange?.(o.value)
                  setOpen(false)
                  setQuery('')
                }}>
                {o.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Select
