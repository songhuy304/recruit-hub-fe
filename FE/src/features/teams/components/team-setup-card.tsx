import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TeamSetupCardProps {
  children: React.ReactNode;
  className?: string;
}

function TeamSetupCard({ children, className }: TeamSetupCardProps) {
  return (
    <Card className={cn("w-full max-w-100 gap-4 shadow-sm", className)}>
      {children}
    </Card>
  );
}

export { TeamSetupCard };
