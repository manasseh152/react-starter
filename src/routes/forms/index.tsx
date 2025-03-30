import type { FormEvent } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { useAppForm } from "@/components/fields/form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [output, setOutput] = useState<string | null>(null);

  const { AppField, handleSubmit, reset } = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: async (values) => {
      setOutput(JSON.stringify(values, null, 2));
    },
    validators: {
      onSubmit: z.object({
        firstName: z.string().min(1).max(20),
        lastName: z.string().min(1).max(20),
        email: z.string().email(),
      }),
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  const onReset = () => {
    reset();
  };

  const onClear = () => {
    setOutput(null);
  };

  const onCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="w-full max-w-xl flex flex-col gap-4 p-4">
        <AppField
          name="firstName"
          validators={{
            onBlur: z.string().min(1).max(20),
          }}
          children={({ TextField }) => <TextField label="First Name" />}
        />
        <AppField
          name="lastName"
          validators={{
            onBlur: z.string().min(1).max(20),
          }}
          children={({ TextField }) => <TextField label="Last Name" />}
        />
        <AppField
          name="email"
          validators={{
            onBlur: z.string().email(),
          }}
          children={({ TextField }) => <TextField label="Email" />}
        />
        <div className="w-full flex gap-2">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="destructive" onClick={onReset}>Reset</Button>
          <Button type="button" variant="secondary" onClick={onClear}>Clear</Button>
          <Button type="button" variant="outline" onClick={onCopy}>Copy</Button>
        </div>
      </form>
    </>
  );
}
