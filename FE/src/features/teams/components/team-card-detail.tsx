interface TeamCardDetailProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel: string;
  confirmTitle: string;
  confirmDescription: string;
  onConfirm: () => void;
  isPending?: boolean;
}

function TeamCardDetail({
  icon: Icon,
  title,
  description,
  actionLabel,
  confirmTitle,
  confirmDescription,
  onConfirm,
  isPending = false,
}: TeamCardDetailProps) {
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
    </div>
  );
}
