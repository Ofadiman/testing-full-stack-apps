import { Navigation } from '@components/Navigation.component'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { lazy } from 'react'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

export const Route = createRootRoute({
  notFoundComponent: () => {
    return <div>Hello from notFoundComponent</div>
  },
  component: function RootRoute() {
    return (
      <>
        <Navigation />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  },
})
