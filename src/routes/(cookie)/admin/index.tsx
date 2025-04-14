import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(cookie)/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(cookie)/admin/"!</div>
}
