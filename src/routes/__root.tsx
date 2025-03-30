import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="w-full flex justify-center gap-4 bg-background text-foreground p-4" role="navigation">
        <ul className="flex gap-4" aria-label="External Links">
          <li>
            <a
              className="text-foreground hover:underline"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </li>
          <li>
            <a
              className="text-foreground hover:underline"
              href="https://tanstack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn TanStack
            </a>
          </li>
        </ul>
        <ul className="flex gap-4" aria-label="Internal Links">
          <li>
            <Link
              className="text-foreground hover:underline"
              to="/forms"
            >
              Forms
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
