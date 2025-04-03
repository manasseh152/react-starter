import { useState } from "react";
import { toast } from "sonner";
import * as v from "valibot";

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

export const userProfileSchemaValibot = v.object({
  // Section 1: Basic Information
  fullName: v.pipe(v.string(), v.minLength(1, "Full name is required"), v.maxLength(50, "Full name cannot exceed 50 characters")),
  email: v.pipe(v.string(), v.minLength(1, "Email is required"), v.maxLength(100, "Email cannot exceed 100 characters"), v.email("Invalid email address")),
  country: v.pipe(v.string(), v.minLength(1, "Country selection is required"), v.maxLength(50, "Country cannot exceed 50 characters")),
  // Section 2: Profile Details
  profileVisibility: v.picklist(PROFILE_VISIBILITY_OPTIONS, "Profile visibility is required"),
  bio: v.pipe(v.string(), v.maxLength(500, "Bio cannot exceed 500 characters")),
  profileColor: v.pipe(v.string(), v.minLength(7, "Profile color is required"), v.maxLength(7, "Profile color must be a valid hex color code")),
  // Section 3: Notification Preferences
  enableEmailNotifications: v.boolean(),
  notificationTypes: v.array(v.picklist(NOTIFICATION_TYPE_OPTIONS, "Notification type is required")),
  notificationFrequency: v.pipe(v.number(), v.minValue(1, "Frequency must be at least 1 day"), v.maxValue(30, "Frequency cannot exceed 30 days"), v.integer("Frequency must be a whole number")),
  // Section 4: Financial (Example)
  donationAmount: v.pipe(v.string(), v.minLength(1, "Donation amount is required"), v.maxLength(10, "Donation amount cannot exceed 10 characters")),
  // Section 5: Agreement
  agreeToTerms: v.boolean(),
});

export type UserProfileSchemaValibot = v.InferInput<typeof userProfileSchemaValibot>;

export const defaultValues: UserProfileSchemaValibot = {
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
      onSubmit: userProfileSchemaValibot,
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
