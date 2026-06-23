"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

interface DangerActionRowProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel: string;
  confirmTitle: string;
  confirmDescription: string;
  onConfirm: () => void;
  isPending?: boolean;
  onBeforeOpen?: () => boolean;
}

export function DangerActionRow({
  icon: Icon,
  title,
  description,
  actionLabel,
  confirmTitle,
  confirmDescription,
  onConfirm,
  isPending = false,
  onBeforeOpen,
}: DangerActionRowProps) {
  const [open, setOpen] = useState(false);

  const handleTriggerClick = () => {
    if (onBeforeOpen) {
      const allowed = onBeforeOpen();
      if (!allowed) {
        return;
      }
    }
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <div className="bg-destructive/15 flex size-10 shrink-0 items-center justify-center rounded-lg">
          <Icon className="text-destructive size-5" />
        </div>
        <div className="min-w-0">
          <Typography as="p" variant="label-sm">
            {title}
          </Typography>
          <Typography
            as="p"
            variant="paragraph-sm"
            className="text-muted-foreground mt-1"
          >
            {description}
          </Typography>
        </div>
      </div>

      <Button
        variant="outline"
        className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
        onClick={handleTriggerClick}
      >
        {actionLabel}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={isPending}
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
            >
              {isPending ? "Processing..." : actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
