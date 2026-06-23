"use client";

import { Icons } from "@/components/icons";
import Image from "next/image";
import * as React from "react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useControllableState } from "@/hooks/use-controllable-state";
import { cn, formatBytes } from "@/lib/utils";

export interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: File[];
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;
  onUpload?: (files: File[]) => Promise<void>;
  progresses?: Record<string, number>;
  accept?: DropzoneProps["accept"];
  maxSize?: DropzoneProps["maxSize"];
  disabled?: boolean;
  previewUrl?: string;
  onPreviewRemove?: () => void;
}

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = { "image/*": [] },
    maxSize = 1024 * 1024 * 2,
    disabled = false,
    previewUrl,
    onPreviewRemove,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const uploadingFile = files?.[0];
  const hasPreview = !!previewUrl && !uploadingFile;
  const isUploading = !!uploadingFile;

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 1) {
        toast.error("Only 1 file can be uploaded at a time");
      }

      const file = acceptedFiles[0];
      if (!file) {
        if (rejectedFiles.length > 0) {
          rejectedFiles.forEach(({ file: rejectedFile }) => {
            toast.error(`File ${rejectedFile.name} was rejected`);
          });
        }
        return;
      }

      const updatedFiles = [file];
      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file: rejectedFile }) => {
          toast.error(`File ${rejectedFile.name} was rejected`);
        });
      }

      if (onUpload) {
        toast.promise(onUpload(updatedFiles), {
          error: "Failed to upload",
        });
      }
    },
    [onUpload, setFiles],
  );

  function handlePreviewRemove(event: React.MouseEvent) {
    event.stopPropagation();
    onPreviewRemove?.();
  }

  return (
    <Dropzone
      onDrop={onDrop}
      accept={accept}
      maxSize={maxSize}
      maxFiles={1}
      multiple={false}
      disabled={disabled}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          className={cn(
            "group border-muted-foreground/25 hover:bg-muted/25 relative h-40 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition",
            "ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
            isDragActive && "border-muted-foreground/50",
            disabled && "pointer-events-none opacity-60",
            hasPreview && "border-solid p-0 hover:bg-transparent",
            className,
          )}
          {...dropzoneProps}
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <div className="bg-background/80 absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
              <div className="rounded-full border border-dashed p-3">
                <Icons.upload
                  className="text-muted-foreground size-7"
                  aria-hidden="true"
                />
              </div>
              <p className="text-muted-foreground font-medium">
                Drop the file here
              </p>
            </div>
          ) : null}

          {hasPreview ? (
            <>
              <Image
                src={previewUrl}
                alt="Uploaded file"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />
              <p className="absolute inset-x-0 bottom-3 z-10 px-4 text-center text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                Click or drag to replace
              </p>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={handlePreviewRemove}
                disabled={disabled || !onPreviewRemove}
                className="absolute top-2 right-2 z-20 size-8 rounded-full shadow-sm"
              >
                <Icons.close className="size-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </>
          ) : isUploading ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center">
              <Icons.spinner className="text-muted-foreground size-7 animate-spin" />
              <div className="space-y-1">
                <p className="text-foreground/80 line-clamp-1 text-sm font-medium">
                  {uploadingFile.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {formatBytes(uploadingFile.size)}
                </p>
              </div>
              {progresses?.[uploadingFile.name] ? (
                <Progress
                  value={progresses[uploadingFile.name]}
                  className="w-full max-w-xs"
                />
              ) : null}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-5 text-center">
              <div className="rounded-full border border-dashed p-3">
                <Icons.upload
                  className="text-muted-foreground size-7"
                  aria-hidden="true"
                />
              </div>
              <p className="text-muted-foreground/70 text-sm">
                Upload a file up to {formatBytes(maxSize)}
              </p>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
}
