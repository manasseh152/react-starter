import type { FormEvent } from "react";

import type { CheckBoxOption } from "@/components/form-fields/checkbox-group";
import type { SelectOption } from "@/components/form-fields/select";
import type { NotificationType } from "@/hooks/use-example-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { withForm } from "@/hooks/use-app-form";
import { defaultValues } from "@/hooks/use-example-form";

const COUNTRY_OPTIONS: SelectOption<string>[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
  { value: "za", label: "South Africa" },
  { value: "ru", label: "Russia" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "mx", label: "Mexico" },
  { value: "kr", label: "South Korea" },
  { value: "sg", label: "Singapore" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "nl", label: "Netherlands" },
  { value: "se", label: "Sweden" },
  { value: "no", label: "Norway" },
  { value: "fi", label: "Finland" },
  { value: "dk", label: "Denmark" },
  { value: "pl", label: "Poland" },
  { value: "cz", label: "Czech Republic" },
  { value: "hu", label: "Hungary" },
  { value: "ro", label: "Romania" },
  { value: "tr", label: "Turkey" },
  { value: "gr", label: "Greece" },
  { value: "pt", label: "Portugal" },
  { value: "ie", label: "Ireland" },
];
const NOTIFICATION_TYPE_OPTIONS: CheckBoxOption<NotificationType>[] = [
  { value: "news", label: "News" },
  { value: "messages", label: "Messages" },
  { value: "mentions", label: "Mentions" },
  { value: "updates", label: "Updates" },
];

export const FormSection = withForm({
  defaultValues,
  render: function Render({ form }) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      form.handleSubmit();
    }

    function handleReset() {
      form.reset();
    }

    return (
      <div className="w-full lg:w-1/2 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold mb-1">Form Example</h1>
          <p className="text-sm text-muted-foreground">Fill out the form below to see the resulting JSON output</p>
        </div>

        <div className="rounded-md border bg-card shadow-sm">
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            <form.AppField
              name="fullName"
              children={field => (
                <Label>
                  <Label.Text>Full Name</Label.Text>
                  <field.TextField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="email"
              children={field => (
                <Label>
                  <Label.Text>Email</Label.Text>
                  <field.TextField field={field} type="email" />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="country"
              children={field => (
                <Label>
                  <Label.Text>Country</Label.Text>
                  <field.SelectField field={field} options={COUNTRY_OPTIONS} />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="profileVisibility"
              children={field => (
                <Label>
                  <Label.Text>Profile Visibility</Label.Text>
                  <field.RadioGroupField field={field}>
                    <field.RadioGroupItemField field={field} value="public" label="Public" />
                    <field.RadioGroupItemField field={field} value="private" label="Private" />
                    <field.RadioGroupItemField field={field} value="friends" label="Friends" />
                  </field.RadioGroupField>
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="bio"
              children={field => (
                <Label>
                  <Label.Text>Bio</Label.Text>
                  <field.TextAreaField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="profileColor"
              children={field => (
                <Label>
                  <Label.Text>Profile Color</Label.Text>
                  <field.ColorPickerField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="enableEmailNotifications"
              children={field => (
                <Label>
                  <field.SwitchField field={field} />
                  <Label.Text>Enable Email Notifications</Label.Text>
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="notificationTypes"
              children={field => (
                <Label>
                  <Label.Text>Notification Types</Label.Text>
                  <field.CheckboxGroupField field={field} options={NOTIFICATION_TYPE_OPTIONS} />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="notificationFrequency"
              children={field => (
                <Label>
                  <Label.Text>Notification Frequency</Label.Text>
                  <field.SliderField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="donationAmount"
              children={field => (
                <Label>
                  <Label.Text>Donation Amount</Label.Text>
                  <field.CurrencyField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="agreeToTerms"
              children={field => (
                <Label>
                  <field.CheckboxField field={field} />
                  <Label.Text>I agree to the terms and conditions</Label.Text>
                  <field.ValidationError />
                </Label>
              )}
            />

            <div className="w-full flex flex-col gap-2">
              <form.AppForm>
                <form.SubmitButton className="w-full" />
                <form.Subscribe
                  selector={state => state.isDirty}
                  children={isDirty => isDirty && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleReset}
                      disabled={!isDirty}
                    >
                      Reset
                    </Button>
                  )}
                />
                <form.Blocker />
                <form.DevHelper />
              </form.AppForm>
            </div>
          </form>
        </div>
      </div>
    );
  },
});
