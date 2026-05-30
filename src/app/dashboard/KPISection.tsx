"use client"
import React from 'react'
import KPICard from './KPICard'

export const KPISection: React.FC = () => {
  const cards = [
    {
      label: 'Total Transactions',
      value: '1,268',
      delta: '+12.5%',
      compare: 'vs last period',
      color: 'green',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      label: 'Success Rate',
      value: '95.34%',
      delta: '+2.6%',
      compare: 'vs last period',
      color: 'green',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
    },
    {
      label: 'Failed Transactions',
      value: '45,893',
      delta: '-8.2%',
      compare: 'vs last period',
      color: 'red',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      ),
    },
    {
      label: 'Revenue',
      value: '₹502.6',
      delta: '+16.2%',
      compare: 'vs last period',
      color: 'purple',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1v22" />
          <path d="M17 5H9.5a3.5 3.5 0 000 7H15a3.5 3.5 0 010 7H6" />
        </svg>
      ),
    },
    {
      label: 'TPS',
      value: '352',
      delta: '+3.1%',
      compare: 'transactions/sec',
      color: 'teal',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      label: 'API Latency',
      value: '320 ms',
      delta: '-4.1%',
      compare: 'avg',
      color: 'indigo',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
    {
      label: 'Drop Rate',
      value: '0.8%',
      delta: '-0.2%',
      compare: 'vs last period',
      color: 'orange',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v14" />
          <path d="M18 12l-6 6-6-6" />
        </svg>
      ),
    },
    {
      label: 'Conversion Rate',
      value: '2.4%',
      delta: '+0.3%',
      compare: 'vs last period',
      color: 'blue',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l3-3 4 4 8-8 3 3" />
        </svg>
      ),
    },
  ]

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((c) => (
        <KPICard key={c.label} label={c.label} value={c.value} delta={c.delta} compare={c.compare} color={c.color} />
      ))}
    </section>
  )
}

export default KPISection
