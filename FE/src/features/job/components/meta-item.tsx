import React from "react";
interface MetaItemProps {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const MetaItem = ({ icon: Icon, children }: MetaItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{children}</span>
    </div>
  );
};

export { MetaItem };
