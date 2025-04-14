import * as v from "valibot";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THEMES, ThemeSchema } from "@/config/theme";
import { useTheme } from "@/hooks/use-theme";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  function handleThemeChange(value: string) {
    const parsedValue = v.safeParse(ThemeSchema, value);

    if (parsedValue.success) {
      setTheme(parsedValue.output);
      return;
    }

    // TODO: Use global error handling
    console.error("[ThemeSelector] Invalid theme value", value);
  }

  return (
    <Select
      defaultValue={theme}
      onValueChange={handleThemeChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map(theme => (
          <SelectItem key={theme} value={theme}>
            {theme}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
