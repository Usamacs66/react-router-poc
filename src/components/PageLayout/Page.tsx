import PageHeading from './PageHeading'

type Page = {
  showPageTitle?: boolean
  title: string
  description?: string
  children?: React.ReactNode
}

function Page({ children, title, showPageTitle = false }: Page) {
  debugger;
  return (
    <>
      {showPageTitle ? <PageHeading title={title} /> : null}
      {children}
    </>
  )
}

export default Page
