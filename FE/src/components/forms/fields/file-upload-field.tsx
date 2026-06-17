"use client";

import { useStore } from "@tanstack/react-form";
import { FileUploader } from "@/components/file-uploader";
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  useFieldContext,
  FormFieldSet,
  FormField,
  FormFieldError,
  createFormField,
} from "@/components/ui/form-context";

interface FileUploadFieldProps {
  label: string;
  description?: string;
  required?: boolean;
  maxSize?: number;
  maxFiles?: number;
  className?: string;
}

export function FileUploadField({
  label,
  description,
  required,
  maxSize,
  maxFiles,
  className,
}: FileUploadFieldProps) {
  const field = useFieldContext();
  const value = useStore(field.store, (s) => s.value) as File[] | undefined;

  return (
    <FormFieldSet>
      <FormField>
        <FieldLabel htmlFor={field.name}>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </FieldLabel>
        <div onBlur={field.handleBlur}>
          <FileUploader
            value={value}
            onValueChange={field.handleChange}
            maxSize={maxSize}
            maxFiles={maxFiles}
            className={className}
          />
        </div>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FormField>
      <FormFieldError />
    </FormFieldSet>
  );
}

export const FormFileUploadField = createFormField(FileUploadField);
