import { createLazyFileRoute } from '@tanstack/react-router'
import { Foo } from './components/Foo.component'

export const Route = createLazyFileRoute('/posts/')({
  component: () => {
    return (
      <div>
        <Foo />
        <div>Hello /posts/!</div>
      </div>
    )
  },
})
