import { ReactNode } from 'react'

interface PageHeadingProps {
  className?: string
  children?: ReactNode
  title: string
  keepTitleCase?: boolean
}

function PageHeading({ className = '', children, keepTitleCase, title }: PageHeadingProps) {
  debugger;
  return (
    <div className={`flex w-full flex-row flex-wrap items-center justify-between gap-2 ${className}`}>
      <h1 className="text-page font-semibold leading-page text-netigate-navy">
        { title}
      </h1>
      {children && <div className="flex flex-row flex-wrap items-center gap-2">{children}</div>}
    </div>
  )
}

export default PageHeading
