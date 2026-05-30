import create from 'zustand'

export type DateRange = { from?: string; to?: string }

export type FiltersState = {
  dateRange?: DateRange
  merchant?: string
  bank?: string
  aggregator?: string
  transactionStatus?: string
  errorCode?: string
  setFilters: (vals: Partial<FiltersState>) => void
  resetFilters: () => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
  dateRange: undefined,
  merchant: '',
  bank: '',
  aggregator: '',
  transactionStatus: '',
  errorCode: '',
  setFilters: (vals) => set((s) => ({ ...s, ...vals })),
  resetFilters: () => set({ dateRange: undefined, merchant: '', bank: '', aggregator: '', transactionStatus: '', errorCode: '' }),
}))
