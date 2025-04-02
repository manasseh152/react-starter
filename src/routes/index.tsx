import appLogo from "@/assets/images/app-logo.svg";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <header className="w-full h-full flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <img
        src={appLogo}
        className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
        alt="logo"
      />
      <p>
        Edit
        {" "}
        <code>src/routes/index.tsx</code>
        {" "}
        and save to reload.
      </p>
    </header>
  );
}
