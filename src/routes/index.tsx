import appLogo from "@/assets/images/app-logo.svg";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { t } = useTranslation("home");

  return (
    <header className="w-full h-full flex flex-col items-center justify-center dark:bg-[#282c34] dark:text-white text-[calc(10px+2vmin)]">
      <img
        src={appLogo}
        className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
        alt="logo"
      />
      <p>
        {t("editInstructionPrefix")}
        <code>{t("editInstructionHighlight")}</code>
        {t("editInstructionSuffix")}
      </p>
    </header>
  );
}
