import { trpc } from './trpc'

export const HomePage = () => {
  const userQuery = trpc.getUser.useQuery()

  if (userQuery.data) {
    return (
      <div>
        <h1>data from api</h1>
        <pre>{JSON.stringify(userQuery.data, null, 2)}</pre>
      </div>
    )
  }

  return <div>loading...</div>
}
