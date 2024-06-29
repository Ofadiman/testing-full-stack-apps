import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
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
  component: function RootRoute() {
    return (
      <>
        <div className="flex gap-2 p-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/auth" className="[&.active]:font-bold">
            Auth
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  },
})
