import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/')({
  component: () => <div>Hello /auth/!</div>,
})
