"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAppForm, useFormFields } from "@/components/ui/tanstack-form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  createTeamSchema,
  type CreateTeamFormValues,
} from "../schemas/team.schema";
import { TeamSetupCard } from "../components/team-setup-card";

interface CreateTeamFormProps {
  onCancel: () => void;
  onSubmit?: (values: CreateTeamFormValues) => void;
  isPending?: boolean;
}

function CreateTeamForm({
  onCancel,
  onSubmit,
  isPending = false,
}: CreateTeamFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useAppForm({
    defaultValues: {
      name: "",
      slug: "",
      logo: [] as File[],
    } as CreateTeamFormValues,
    validators: {
      onSubmit: createTeamSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit?.(value);
    },
  });

  const { FormTextField, FormFileUploadField } =
    useFormFields<CreateTeamFormValues>();

  return (
    <form.AppForm>
      <form.Form className="p-0">
        <TeamSetupCard>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Create team</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            {/* <form.AppField name="logo">
              {(field) => {
                const logo = (field.state.value as File[] | undefined)?.[0];
                const preview = logo ? URL.createObjectURL(logo) : null;

                return (
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="flex items-start gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "bg-muted/50 border-muted-foreground/30 relative size-20 shrink-0 overflow-hidden rounded-lg border border-dashed p-0",
                          "hover:bg-muted",
                        )}
                      >
                        {preview ? (
                          <Image
                            src={preview}
                            alt="Team logo preview"
                            fill
                            className="object-cover"
                            onLoad={() => URL.revokeObjectURL(preview)}
                          />
                        ) : (
                          <Icons.upload className="text-muted-foreground size-5" />
                        )}
                      </Button>

                      <div className="flex flex-col gap-2 pt-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Upload
                        </Button>
                        <Typography
                          variant="paragraph-xs"
                          className="text-muted-foreground"
                        >
                          Recommended size 1:1, up to 10MB.
                        </Typography>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          field.handleChange(file ? [file] : []);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            </form.AppField> */}

            <FormFileUploadField
              name="logo"
              label="Logo"
              className="m-h-24"
              description="Recommended size 1:1, up to 10MB."
              maxSize={10 * 1024 * 1024}
              maxFiles={1}
              required
            />

            <FormTextField
              name="name"
              label="Name"
              placeholder="Enter your team name"
            />
            <FormTextField
              name="slug"
              label="Slug"
              placeholder="Enter team slug"
            />
          </CardContent>

          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isPending}>
              Create team
            </Button>
          </CardFooter>
        </TeamSetupCard>
      </form.Form>
    </form.AppForm>
  );
}

export { CreateTeamForm };
