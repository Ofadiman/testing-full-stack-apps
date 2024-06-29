import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts/$postId')({
  component: () => {
    const params = Route.useParams()
    return (
      <div>
        <p>postId: {params.postId}</p>
        <div>Hello /posts/$postId!</div>
      </div>
    )
  },
})
