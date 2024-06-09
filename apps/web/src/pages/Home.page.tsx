import { Navigation } from '../components/Navigation.component'
import { trpc } from '../trpc'

export const HomePage = () => {
  const userQuery = trpc.posts.getPosts.useQuery()

  if (userQuery.data) {
    return (
      <div>
        <Navigation />
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
