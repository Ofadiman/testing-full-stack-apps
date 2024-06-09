import { Navigation } from '../components/Navigation.component'
import { trpc } from '../trpc'

export const HomePage = () => {
  const userQuery = trpc.posts.getPosts.useQuery()

  if (userQuery.data) {
    return (
      <div>
        <Navigation />
        <p className="rounded bg-blue-500 px-4 py-2 text-base text-white">tailwind</p>
        <pre>{JSON.stringify(userQuery.data, null, 2)}</pre>
      </div>
    )
  }

  return (
    <div>
      <Navigation />
      <div>loading...</div>
    </div>
  )
}
