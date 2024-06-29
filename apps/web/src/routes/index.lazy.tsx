import { createLazyFileRoute } from '@tanstack/react-router'
import { Navigation } from '@components/Navigation.component'
import { trpc } from '../trpc'
import { Button } from '@shadcn/button'

export const Route = createLazyFileRoute('/')({
  component: function Index() {
    const userQuery = trpc.posts.getPosts.useQuery()

    if (userQuery.data) {
      return (
        <div className="mx-10 flex flex-col gap-4">
          <Navigation />
          <Button
            onClick={() => {
              console.log('shadcn button clicked')
            }}
          >
            Shadcn button
          </Button>
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
  },
})
