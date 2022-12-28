import React, { Fragment, lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { OneOf } from '../../src/utils/types'
import Page from '../components/PageLayout/Page'

const Home = lazy(() => import('../pages/Home'))
const User = lazy(() => import('../pages/User'))


type RouteAllowedRoles = 'admin'

export type RouteType = {
  path: string
  key: string
  subPaths?: RouteType[]
  hideInNav?: boolean
  captionsKeys?: string[]
  restrictedTo?: RouteAllowedRoles[]
  breadcrumbCaptionKey?: string
  showBreadcrumbs?: boolean
} & OneOf<[{ Component: React.ElementType }, { redirectTo: string }]> &
  OneOf<[{ titleId: string }, { title: string }]>

export const ROUTES: RouteType[] = [
  { path: '/', key: 'ROOT', titleId: '', redirectTo: '/home', hideInNav: true, },
  {
    path: '/home',
    key: 'HOME',
    Component: Home,
    title:'home'
  },
  {
    path: '/user',
    key: 'USER',
    Component: User,
    title:'user',
  }
]

function LazyPage({ route }: { route: RouteType }) {

const user : User = {
  Name:"usama"
}

  const allowed = user ? isRouteAllowed(route, user) : route.path === '/login' || route.path === '/logout'

  const renderSpinner = true && <>...loading</>//!(userReady) && <Spinner />
  const renderComponent = route.Component && <route.Component />
  const renderRedirect = route.redirectTo && <Navigate replace to={route.redirectTo} />
  const renderPage = renderSpinner || allowed ? renderComponent || renderRedirect : <Navigate replace to="/login" />

  return (
    <Page title={route.title?? "title"} showPageTitle={true}>
      {/* </ErrorBoundary> can be used here */}
        <Suspense fallback={<>...loading</>}>{renderPage}</Suspense>
    </Page>
  )
}

function renderRoutes(routes: RouteType[]) {
  return (
    <Fragment>
      {routes.map(route => (
        <Fragment key={route.key}>
          <Route key={route.key} path={route.path} element={<LazyPage route={route} />} />
          {route.subPaths && renderRoutes(route.subPaths)}
        </Fragment>
      ))}
    </Fragment>
  )
}

export function isRouteAllowed(route: RouteType, user: User) {
  return true // role base authentication
}

export const Pages = () => {
  return <Routes>{renderRoutes(ROUTES)}</Routes>
}

type User = {
  Name:string
}