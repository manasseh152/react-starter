import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { useAppForm } from "@/hooks/use-app-form";

// Define reusable constants for enums if they are used elsewhere
export const PROFILE_VISIBILITY_OPTIONS = [
  "public",
  "friends",
  "private",
] as const;
export type ProfileVisibility = typeof PROFILE_VISIBILITY_OPTIONS[number];
export const NOTIFICATION_TYPE_OPTIONS = [
  "news",
  "messages",
  "mentions",
  "updates",
] as const;
export type NotificationType = typeof NOTIFICATION_TYPE_OPTIONS[number];

export const userProfileSchema = z
  .object({
    // Section 1: Basic Information
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    country: z.string().min(1, { message: "Country selection is required" }),

    // Section 2: Profile Details
    profileVisibility: z.string(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters"),
    profileColor: z.string(),

    // Section 3: Notification Preferences
    enableEmailNotifications: z.boolean().default(true),
    notificationTypes: z.array(z.string()),
    notificationFrequency: z
      .number()
      .min(1, "Frequency must be at least 1 day")
      .max(30, "Frequency cannot exceed 30 days")
      .int("Frequency must be a whole number"),

    // Section 4: Financial (Example)
    donationAmount: z.string(),

    // Section 5: Agreement
    agreeToTerms: z.boolean(),
  });

export type UserProfileSchema = z.infer<typeof userProfileSchema>;

export const defaultValues: UserProfileSchema = {
  fullName: "",
  email: "",
  country: "",
  profileVisibility: "public",
  bio: "",
  profileColor: "#000000",
  enableEmailNotifications: true,
  notificationTypes: [],
  notificationFrequency: 1,
  donationAmount: "0.00",
  agreeToTerms: false,
};

export function useExampleForm() {
  const [output, setOutput] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
    // Simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set the output to the formatted JSON string
      setOutput(JSON.stringify(value, null, 2));

      // Reset the form
      form.reset();

      // Show success toast
      toast.success("Form submitted successfully!");
    },
    onSubmitInvalid: () => {
    // Show error toast
      toast.error("Form submission failed. Please check the errors.");
    },
    validators: {
      onSubmit: userProfileSchema,
    },
  });

  function onClear() {
    setOutput(null);
  }

  function onCopy() {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  }

  return {
    form,
    output,
    onClear,
    onCopy,
  };
}
