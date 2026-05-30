import React from 'react'

type Props = React.PropsWithChildren<{ className?: string }>

export const PageContainer: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <main className={`min-h-screen bg-bg py-6 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 space-y-6">{children}</div>
    </main>
  )
}

export default PageContainer
