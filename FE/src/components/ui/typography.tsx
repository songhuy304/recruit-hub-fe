"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label-xl"
  | "label-lg"
  | "label-md"
  | "label-sm"
  | "label-xs"
  | "paragraph-xl"
  | "paragraph-lg"
  | "paragraph-md"
  | "paragraph-sm"
  | "paragraph-xs"
  | "subheading-md"
  | "subheading-sm"
  | "subheading-xs"
  | "subheading-2xs"
  | "doc-label"
  | "doc-paragraph";

/**
 * 👉 CHỈ DÙNG TAILWIND SCALE
 * Không dùng text-[xxpx]
 */
const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-5xl leading-tight font-medium tracking-tight",
  h2: "text-4xl leading-tight font-medium tracking-tight",
  h3: "text-3xl leading-tight font-medium tracking-tight",
  h4: "text-2xl leading-snug font-medium tracking-tight",
  h5: "text-xl leading-snug font-medium",
  h6: "text-lg leading-normal font-medium",

  "label-xl": "text-xl font-medium tracking-tight",
  "label-lg": "text-lg font-medium tracking-tight",
  "label-md": "text-base font-medium tracking-tight",
  "label-sm": "text-sm font-medium tracking-tight",
  "label-xs": "text-xs font-medium",

  "paragraph-xl": "text-xl leading-relaxed",
  "paragraph-lg": "text-lg leading-relaxed",
  "paragraph-md": "text-base leading-relaxed",
  "paragraph-sm": "text-sm leading-relaxed",
  "paragraph-xs": "text-xs leading-normal",

  "subheading-md": "text-base font-medium tracking-wide",
  "subheading-sm": "text-sm font-medium tracking-wide",
  "subheading-xs": "text-xs font-medium tracking-wider",
  "subheading-2xs": "text-[11px] font-medium tracking-widest",

  "doc-label": "text-lg font-medium leading-relaxed",
  "doc-paragraph": "text-lg leading-relaxed",
};

const defaultElement: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",

  "label-xl": "p",
  "label-lg": "p",
  "label-md": "p",
  "label-sm": "p",
  "label-xs": "p",

  "paragraph-xl": "p",
  "paragraph-lg": "p",
  "paragraph-md": "p",
  "paragraph-sm": "p",
  "paragraph-xs": "p",

  "subheading-md": "p",
  "subheading-sm": "p",
  "subheading-xs": "p",
  "subheading-2xs": "span",

  "doc-label": "p",
  "doc-paragraph": "p",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType; // 👈 span/p/div override được
  variant?: TypographyVariant;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant = "paragraph-md", className, ...props }, ref) => {
    const Component = as ?? defaultElement[variant] ?? "p";

    return (
      <Component
        ref={ref}
        data-slot="typography"
        className={cn("text-foreground", variantClasses[variant], className)}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";

export { Typography };
