"use client";

import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { cn } from "@/lib/utils";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Input } from "./input";
import { Button } from "./button";

type InputPasswordProps = React.ComponentProps<typeof InputGroupInput>;

export function InputPassword({ className, ...props }: InputPasswordProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        className="bg-background"
        id="password-toggle"
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {showPassword ? (
          <IconEyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <IconEye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
