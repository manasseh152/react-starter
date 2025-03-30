import { useMemo } from "react";

import { useFieldContext } from "./form";

export function InfoField() {
  const field = useFieldContext<string>();
  const errors = useMemo<any[]>(() => field.state.meta.errors, [field.state.meta.errors]);

  if (errors.length === 0) {
    return null;
  }

  return (
    <>
      {field.state.meta.isTouched && errors.length
        ? (
            <em>{errors.map(err => err.message).join(",")}</em>
          )
        : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
