"use client"
import React, { useState } from 'react'
// Input not needed here — individual fields use native inputs / Select
import Select from '../ui/Select'
import { useFiltersStore, DateRange } from '../store/filtersStore'

type Option = { label: string; value: string }

type Props = {
  merchants?: Option[]
  banks?: Option[]
  aggregators?: Option[]
  statuses?: Option[]
  errorCodes?: Option[]
  onApply?: (vals: Partial<import('../store/filtersStore').FiltersState>) => void
}

export const Filters: React.FC<Props> = ({
  merchants = [{ label: 'All Merchants', value: '' }, { label: 'Amazon', value: 'Amazon' }],
  banks = [{ label: 'All Banks', value: '' }, { label: 'HDFC Bank', value: 'HDFC Bank' }],
  aggregators = [{ label: 'All Aggregators', value: '' }, { label: 'Razorpay', value: 'Razorpay' }],
  statuses = [{ label: 'All Statuses', value: '' }, { label: 'Success', value: 'success' }, { label: 'Failed', value: 'failed' }, { label: 'Pending', value: 'pending' }],
  errorCodes = [{ label: 'All Error Codes', value: '' }, { label: '104', value: '104' }, { label: '201', value: '201' }],
  onApply,
}) => {
  const store = useFiltersStore()

  // Initialize local controlled state from global store once (controlled form)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => store.dateRange)
  const [merchant, setMerchant] = useState<string>(() => store.merchant || '')
  const [bank, setBank] = useState<string>(() => store.bank || '')
  const [aggregator, setAggregator] = useState<string>(() => store.aggregator || '')
  const [transactionStatus, setTransactionStatus] = useState<string>(() => store.transactionStatus || '')
  const [errorCode, setErrorCode] = useState<string>(() => store.errorCode || '')

  const handleReset = () => {
    setDateRange(undefined)
    setMerchant('')
    setBank('')
    setAggregator('')
    setTransactionStatus('')
    setErrorCode('')
    store.resetFilters()
  }

  const handleApply = () => {
    store.setFilters({ dateRange, merchant, bank, aggregator, transactionStatus, errorCode })
    onApply?.({ dateRange, merchant, bank, aggregator, transactionStatus, errorCode })
  }

  return (
    <div className="mb-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <form className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-end">
          {/* Date Range */}
          <div className="col-span-1">
            <label className="text-xs text-gray-500 mb-1 block">Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange?.from || ''}
                onChange={(e) => setDateRange((d) => ({ ...(d || {}), from: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
              />
              {/* <input
                type="date"
                value={dateRange?.to || ''}
                onChange={(e) => setDateRange((d) => ({ ...(d || {}), to: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
              /> */}
            </div>
          </div>

          {/* Merchant */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Merchant</label>
            <Select options={merchants} value={merchant} onChange={(v) => { if (typeof v === 'string') setMerchant(v) }} searchable />
          </div>

          {/* Bank */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Bank</label>
            <Select options={banks} value={bank} onChange={(v) => { if (typeof v === 'string') setBank(v) }} searchable />
          </div>

          {/* Aggregator */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Aggregator</label>
            <Select options={aggregators} value={aggregator} onChange={(v) => { if (typeof v === 'string') setAggregator(v) }} searchable />
          </div>

          {/* Transaction Status */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Transaction Status</label>
            <Select options={statuses} value={transactionStatus} onChange={(v) => { if (typeof v === 'string') setTransactionStatus(v) }} />
          </div>

          {/* Error Code */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Error Code</label>
            <Select options={errorCodes} value={errorCode} onChange={(v) => { if (typeof v === 'string') setErrorCode(v) }} searchable />
          </div>

          {/* Buttons span full row on small screens */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-6 flex justify-end gap-3 mt-2">
            <button type="button" onClick={handleReset} className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm text-gray-700">
              Reset
            </button>
            <button type="button" onClick={handleApply} className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Filters
