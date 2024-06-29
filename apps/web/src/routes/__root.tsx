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
          <Link to="/posts" className="[&.active]:font-bold">
            Posts
          </Link>
          <Link
            to="/posts/$postId"
            params={{ postId: 'a486f0d1-f961-40f9-b366-163c425e7ae7' }}
            className="[&.active]:font-bold"
          >
            Post id
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  },
})
