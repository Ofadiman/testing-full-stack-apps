import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth')({
  component: function About() {
    return <div className="p-2">Hello from Auth!</div>
  },
})
