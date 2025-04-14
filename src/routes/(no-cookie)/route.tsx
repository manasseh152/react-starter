import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(no-cookie)')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
