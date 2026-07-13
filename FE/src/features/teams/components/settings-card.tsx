import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface SettingsCardProps {
  title: string;
  description: string;
  variant?: "default" | "danger";
  children: React.ReactNode;
  disabled?: boolean;
}

export function SettingsCard({
  title,
  description,
  variant = "default",
  children,
  disabled = false,
}: SettingsCardProps) {
  return (
    <Card
      className={cn(
        "gap-0 py-0",
        variant === "danger" && "border-destructive/40",
        disabled && "pointer-events-none"
      )}
    >
      <CardContent className="flex flex-col gap-8 p-6 lg:flex-row lg:gap-12">
        <div className="shrink-0 lg:w-56 xl:w-64">
          <Typography
            as="h4"
            variant="label-lg"
            className={cn(variant === "danger" && "text-destructive")}
          >
            {title}
          </Typography>
          <Typography
            as="p"
            variant="paragraph-sm"
            className="text-muted-foreground mt-1.5"
          >
            {description}
          </Typography>
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </CardContent>
    </Card>
  );
}
