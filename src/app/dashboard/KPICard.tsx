import React from 'react'

type Props = {
  icon?: React.ReactNode
  label: string
  value: string
  delta?: string
  compare?: string
  color?: string
}

export const KPICard: React.FC<Props> = ({ icon, label, value, delta, compare, color = 'indigo' }) => {
  const deltaIsPositive = !!delta && (delta.startsWith('+') || delta.startsWith('↑') || delta.includes('up'))
  const deltaColor = deltaIsPositive ? 'text-green-600' : 'text-red-500'

  const colorMap: Record<string, { bg: string; text: string }> = {
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    red: { bg: 'bg-red-50', text: 'text-red-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
  }

  const col = colorMap[color] ?? colorMap.indigo

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out h-28 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${col.bg} ${col.text} flex-shrink-0`}>
          {icon ?? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="8" />
            </svg>
          )}
        </div>
        <div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
      </div>

      <div className="text-right">
        {delta && <div className={`text-sm font-semibold ${deltaColor}`}>{delta}</div>}
        {compare && <div className="text-xs text-gray-400 mt-1">{compare}</div>}
      </div>
    </div>
  )
}

export default KPICard
