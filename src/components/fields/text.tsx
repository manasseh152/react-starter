import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFieldContext } from "./form";
import { InfoField } from "./info";

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();

  return (
    <Label className="flex flex-col items-start gap-1">
      <span className="text-sm font-medium">{label}</span>
      <Input
        type="text"
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      <InfoField />
    </Label>
  );
}
